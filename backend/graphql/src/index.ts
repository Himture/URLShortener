import { createYoga, createSchema } from "graphql-yoga"

export interface Env {}

const yoga = createYoga<Env & ExecutionContext>({
	schema: createSchema({
		typeDefs: `
		type Query {
			hello: String!
		}`,
		resolvers: {
			Query: {
				hello: () => 'Cloudflare Workers!'
			}
		}
	})
})

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response("Hello World!");
	},
};
