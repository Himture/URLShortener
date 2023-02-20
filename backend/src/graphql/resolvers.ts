import { getUrlByShortUrl, createUser, getAllShortURL } from "../planetscale/database";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const userPoolId = "ap-south-1_avENjbeq1";
const appClientId = "1ks1rkp3i7h8t84alt70hfs5h2";
const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
  region: "ap-south-1",
});

const resolvers = {
  Query: {
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
        createUser(username, email)
        const response = await cognitoIdentityProviderClient.send(signUp);
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
        return response.AuthenticationResult?.IdToken;
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

export default resolvers;
