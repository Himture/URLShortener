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

    type Link {
      oLink: String
      sLink: String
      username: String
      tag: String
    }

    type LinksRes {
      links: [Link]
      message: String
    }

    type sLink {
      sLink: String!
      oLink: String!
    }

    type dbRes {
      insertId: String
      message: String!
    }

    type Query {
      incrementalSearch(query: String!): [sLink]
      getURL(sLink: String!): LinksRes
      allUserURL(username: String): LinksRes
      getUsername: String
    }

    type Mutation {
      login(email: String, password: String): String
      confirmUser(username: String, code: String): String
      signup(email: String, password: String, username: String): String
      logout(idToken: String): String

      addUrl(oLink: String, sLink: String): dbRes
      updateUrl(sLink: String, oLink: String): dbRes
      addTag(sLink: String, tag: String): dbRes
      deleteUrl(sLink: String): dbRes
    }
  `,
  resolvers,
});
