import mysql, { Pool, RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, createShortUrl, getUrlByShortUrl, getUserByEmail } from '../planetscale/database';

const JWT_SECRET = 'mysecret';

export interface USER {
  password: string
}

interface RequestContext {
  user: {
    id: number;
    email: string;
  };
}

const resolvers = {
  Query: {
    getURL: async (_: ParentNode, { sLink }: { sLink: string }) => {
      // return("Hi i work")
      const res = getUrlByShortUrl(sLink)
      return res
    },
  },
  Mutation: {
    createURL: async (_: ParentNode, { oLink, sLink, userID, tag}: { oLink: string, sLink: string, userID: number, tag: string }) => {
      const res = createShortUrl(oLink, sLink, userID, tag)
      return true
    },
    createUser: async (_:ParentNode, {name, email, password}: {name:string, email:string, password: string}) => {
      const res = createUser(name, email, password)
      const token = jwt.sign(email, JWT_SECRET);
      return {token, res }
     },
     login: async (_:ParentNode, { email, password }: {email: string, password:string}) => {
      try {
        const result = await getUserByEmail(email);
        const user = result;

        if (!user) {
          return("Not a user");
        }

        if (password !== password) {
          return("Password was messy. It did not work.");
        }

        const token = jwt.sign(user, process.env.JWT_SECRET as string);
        return { token, user };
      } catch (error) {
        return("Could not generate tokens");
      }
    },
  }
}

export default resolvers;