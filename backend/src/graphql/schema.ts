import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type User {
      name: String!
      email: String!
      uID: Int!
      slinks: [String]
    }

    type Links {
      id: Int!
      oLink: String!
      sLink: String!
      userID: Int!
      tag: String
    }

    type Query {
      users: [Users!]
      link(id: Int!): Links
    }

    type Mutation {
      createLink(url: String!): Link!
      createUser(name: String!, email: String!, password: String!): User!
      login(email: String!, password: String!): String!
    }
  `,
  resolvers,
});
