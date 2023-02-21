import { getUrlByShortUrl, createUser, getAllShortURL, createShortUrl } from "../planetscale/database";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { KVNamespace } from '@cloudflare/workers-types'

declare const SLINKS: KVNamespace

const userPoolId = 'ap-south-1_OckXPNIFl';
const appClientId = '3i9euoh46p7ksooio91395srai';
const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
  region: "ap-south-1",
});

export interface Env {
  SLINKS: KVNamespace
}

const resolvers = {
  Query: {
    incrementalSearch: async (_: unknown, {query}: {query:String}, {req}: {req: Request}) => {
      // const authorizationHeader = req.headers.get('Authorization');
      // if(!authorizationHeader){
      //   return "Unauthorised"
      // }
      // const token = authorizationHeader?.replace('Bearer ', '');
      // const queryy = req.headers.get('query');
      // const user = await verifyUser(token as string)
      const cache = `himture-${query}`
      const cacheSearch = await SLINKS.get(cache)
      if(cacheSearch){
          const res:any = cacheSearch
          console.log('===============================================')
          console.log(res)
          console.log('===============================================')
          return res
      }
      else{
        const res:any = await getAllShortURL("himture")
        const fil = res.filter((a:any) => a.sLink.includes(query))
        SLINKS.put(cache, fil, { expirationTtl: 60 })
        return fil
      }
    },
    allUserURL: async (_: unknown, { username }: { username: string }) => {
      try {
        const res = getAllShortURL(username)
        return res
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return err;
      }
    },
    getURL: async (_: ParentNode, { sLink }: { sLink: string }) => {
      try {
        const res = getUrlByShortUrl(sLink);
        return res;
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return err;
      }
    },
  },
  Mutation: {

    addUrl:async (_:unknown, {username, oLink, sLink, tag}:{username: string, oLink: string, sLink:string, tag:string}) => {
      createShortUrl(oLink, sLink, username, tag)
      return "Success"
    },
    signup: async (
      _: unknown,
      { email, password, username }: { username: string, email: string, password: string }
    ) => {
      const signUp = new SignUpCommand({
        ClientId: appClientId,
        Username: username,
        Password: password,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      });
      try {
        const response = await cognitoIdentityProviderClient.send(signUp);
        createUser(username, email)
        return response.UserSub;
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return err;
      }
    },
    confirmUser: async (
      _: unknown,
      { username, code }: { username: string, code: string }
    ) => {
      const confirmSignUpCommand = new ConfirmSignUpCommand({
        ClientId: appClientId,
        Username: username,
        ConfirmationCode: code,
      });

      try {
        const res = await cognitoIdentityProviderClient.send(
          confirmSignUpCommand
        );
        return "Success";
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return err;
      }
    },
    login: async (
      _: unknown,
      { email, password }: { email: string, password: string }
    ) => {
      const auth = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: appClientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });
      try {
        const response = await cognitoIdentityProviderClient.send(auth);
        return response.AuthenticationResult?.AccessToken;
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return err;
      }
    },
    logout: async (_: unknown, { idToken }: { idToken: string }) => {
      const signOut = new GlobalSignOutCommand({
        AccessToken: idToken,
      });
      try {
        const res = await cognitoIdentityProviderClient.send(signOut);
        return "Success";
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return err;
      }
    },
  },
};

const verifyUser = async (token:string) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: userPoolId,
    tokenUse: "access",
    clientId: appClientId,
  });
  
  try {
    const payload = await verifier.verify(
      token
    );
    return payload.username
  } catch(error) {
    let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return err;
  }
}

export default resolvers;
