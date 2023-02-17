import { createSchema } from "graphql-yoga";
import resolvers from "./resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type User {
      name: String!
      email: String!
      uID: Int!
      slinks: [String]
      passw: String!
    }

    type Links {
      id: Int!
      oLink: String!
      sLink: String!
      userID: Int!
      tag: String
    }

    type Query {
      getURL(sLink: String!): String
    }

    type Mutation {
      createURL(oLink:String, sLink:String, userID:Int, tag:String):Boolean
      createUser(name:String, email:String, password:String):Boolean
      login(email:String, password:String):String
    }
  `,
  resolvers,
});
