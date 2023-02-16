import { createSchema } from 'graphql-yoga'
 
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
      name: String!
	}`,
	resolvers: {
		Query: {
			name() {
        return("wow this is name")
      }
		}
	}
	})

