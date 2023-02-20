import { createSchema } from "graphql-yoga";
import resolvers from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type User {
      name: String!
      email: String!
      username: String!
      slinks: [String]
    }

    type Links {
      oLink: String!
      sLink: String!
      username: String!
      tag: String
    }

    type Query {
      getURL(sLink: String!): [Links]
      allUserURL(username: String!): [Links]
    }

    type Mutation {
      login(email: String, password: String, username: String): String
      confirmUser(username: String, code: String): String
      signup(email: String, password: String, username: String): String
      logout(email: String): String

      createURL(oLink: String, sLink: String, userID: Int, tag: String): Boolean
      createUser(name: String, email: String, password: String): Boolean
    }
  `,
  resolvers,
});
