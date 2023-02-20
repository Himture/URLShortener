import { createUser, createShortUrl, getUrlByShortUrl, getUserByEmail } from '../planetscale/database';
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, GlobalSignOutCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const userPoolId = 'ap-south-1_avENjbeq1';
const appClientId = '1ks1rkp3i7h8t84alt70hfs5h2';
const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({ region: 'ap-south-1' });

const resolvers = {
  Query: {
    getURL: async (_: ParentNode, { sLink }: { sLink: string }) => {
      const res = getUrlByShortUrl(sLink)
      return res
    },
  },
  Mutation: {

    
    signup: async (_: unknown, { username, email, password }: { username: string, email: string, password: string }) => {
      const signUp = new SignUpCommand({
        ClientId: appClientId,
        Username: username,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
        ],
      });
      try {
        const response = await cognitoIdentityProviderClient.send(signUp);
        return response.UserSub;
      } catch (error) {
        let err = "error"
        if (error instanceof Error) {
          err = error.message
        }
        return error
      }
    },
    confirmUser: async (_: unknown, { username, code }: { username: string, code: string }) => {
      const confirmSignUpCommand = new ConfirmSignUpCommand({
        ClientId: appClientId,
        Username: username,
        ConfirmationCode: code
      });

      try {
        const res = await cognitoIdentityProviderClient.send(confirmSignUpCommand)
        return "Success"
      } catch (error) {
        let err = "error"
        if (error instanceof Error) {
          err = error.message
        }
        return error
      }
    },
    login: async (_: unknown, { email, password }: { email: string, password: string }) => {
      const auth = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
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
        let err = "error"
        if (error instanceof Error) {
          err = error.message
        }
        return error
      }
    },
    logout: async (_: unknown, { idToken }: { idToken: string }) => {
      const signOut = new GlobalSignOutCommand({
        AccessToken: idToken,
      });
      try {
        const res = await cognitoIdentityProviderClient.send(signOut);
        return "Success"
      } catch (error) {
        let err = "error"
        if (error instanceof Error) {
          err = error.message
        }
        return error
      }
    }
  },
}

export default resolvers;