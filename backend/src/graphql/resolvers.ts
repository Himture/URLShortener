import { getUrlByShortUrl, createUser, getAllShortURL, createShortUrl, updateShortUrl, deleteShortUrl, addTag } from "../planetscale/database";
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, GlobalSignOutCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { KVNamespace } from '@cloudflare/workers-types'

declare const SLINKS: KVNamespace

const userPoolId = 'ap-south-1_OckXPNIFl';
const appClientId = '3i9euoh46p7ksooio91395srai';
const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({ region: "ap-south-1" });

const resolvers = {
  Query: {
    incrementalSearch: async (_: unknown, { query }: { query: String }, ctx: any) => {
      const user = await verifyUser(ctx)
      if (!user) {
        return "Unauthorised"
      }
      const cache = `${user}-${query}`
      const cacheSearch = await SLINKS.get(cache)
      if (cacheSearch) {
        const res: any = cacheSearch
        return res
      }
      else {
        const res: any = await getAllShortURL("himture")
        const fil = res.filter((a: any) => a.sLink.includes(query))
        SLINKS.put(cache, fil, { expirationTtl: 60 })
        return fil
      }
    },
    allUserURL: async (_: unknown, args:any, ctx: any) => {
      const user = await verifyUser(ctx)
      if (!user) {
        return {message: "Unauthorized"}
      }
      try {
        const res = await getAllShortURL(user)
        return {
          links: res,
          message: "Success"
        }
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return { message: err }
      }
    },
    getURL: async (_: ParentNode, { sLink }: { sLink: string }, ctx: any) => {
      const user = await verifyUser(ctx)
      if (!user) {
        return {message:"Unauthorized"}
      }
      try {
        const res = getUrlByShortUrl(sLink);
        return {
          links: res,
          message: "Success" }
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return { message: err }
      }
    },
  },
  Mutation: {

    addUrl: async (_: unknown, { oLink, sLink }: { oLink: string, sLink: string }, ctx: any) => {
      const user = await verifyUser(ctx)
      if (!user) {
        return { message: "Unauthorized" }
      }
      try {
        const res = await createShortUrl(oLink, sLink, user)
        return ({
          insertId: res,
          message: "Success"
        })
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return { message: err }
      }
    },

    updateUrl: async (_: unknown, { sLink, oLink }: { sLink: string, oLink: string }, ctx: any) => {
      const user = await verifyUser(ctx)
      if (!user) {
        return { message: "Unauthorized" }
      }
      try {
        const res = await updateShortUrl(sLink, oLink, user)
        return { inserID: res,
           message: "Success" }
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return { message: err }
      }
    },

    deleteUrl: async (_: unknown, { sLink }: { sLink: string }, ctx:any) => {
      const user = await verifyUser(ctx)
      if (!user) {
        return { message: "Unauthorized" }
      }
      try {
        const res = await deleteShortUrl(user, sLink)
        return { inserID: res,
          message: "Success" }
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return { message: err }
      }
    },

    addTag:async (_:unknown, {sLink, tag}:{sLink:string, tag:string}, ctx:any) => {
      const user = await verifyUser(ctx)
      if (!user) {
        return { message: "Unauthorized" }
      }
      try {
        const res = await addTag(tag, sLink, user)
        return { inserID: res,
          message: "Success" }
      } catch (error) {
        let err = "error";
        if (error instanceof Error) {
          err = error.message;
        }
        return { message: err }
      }
    },

    signup: async ( _: unknown, { email, password, username }: { username: string, email: string, password: string } ) => {
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

    confirmUser: async ( _: unknown, { username, code }: { username: string, code: string } ) => {
      const confirmSignUpCommand = new ConfirmSignUpCommand({ ClientId: appClientId, Username: username, ConfirmationCode: code });
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

    login: async (_: unknown, { email, password }: { email: string, password: string }) => {
      const auth = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: appClientId,
        AuthParameters: { USERNAME: email, PASSWORD: password },
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

const verifyUser = async (ctx: any) => {
  const authorizationHeader = ctx.request.headers.get('Authorization');
  const token = authorizationHeader?.replace('Bearer ', '');
  const verifier = CognitoJwtVerifier.create({
    userPoolId: userPoolId,
    tokenUse: "access",
    clientId: appClientId,
  });

  if (authorizationHeader) {
    try {
      const payload = await verifier.verify(
        token
      );
      return payload.username
    } catch (error) {
      let err = "error";
      if (error instanceof Error) {
        err = error.message;
      }
      return err;
    }
  }
  else {
    return null
  }
}

export default resolvers;
