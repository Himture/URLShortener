import { schema } from "./schema";
import { createYoga } from "graphql-yoga";
export interface Env {
  SLINKS: KVNamespace;
}

export const gql = createYoga({
  schema,
  landingPage: false,
  graphqlEndpoint: "/",
  cors: {
    origin: 'https://oslashreplica.pages.dev',
    methods: ['POST']
  }
});
