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

    type res {
      oLink: String!
      sLink: String!
      userID: Int!
      tag: String
    }

    type Query {
      getURL(sLink: String!): [Links]
    }

    type Mutation {
      login(email:String, password:String, username: String):String
      confirmUser(username:String, code:String):String
      signup(email:String, password:String):String
      logout(email:String):String

      createURL(oLink:String, sLink:String, userID:Int, tag:String):Boolean
      createUser(name:String, email:String, password:String):Boolean
    }
  `,
  resolvers,
});
