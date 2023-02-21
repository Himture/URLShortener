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

    type sLink {
      sLink: String!
    }

    type Query {
      incrementalSearch(query: String!): [sLink]
      getURL(sLink: String!): [Links]
      allUserURL(username: String!): [Links]
    }

    type Mutation {
      login(email: String, password: String, username: String): String
      confirmUser(username: String, code: String): String
      signup(email: String, password: String, username: String): String
      logout(email: String): String

      addUrl(username:String, oLink:String, sLink:String, tag:String):String
      updateUrl(sLink:String, oLink:String, username:String): String
      deleteUrl(username:String, sLink:String): String
    }
  `,
  resolvers,
});
