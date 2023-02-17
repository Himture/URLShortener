import { schema } from "./schema"
import { createYoga } from "graphql-yoga";

export const gql = createYoga({
  schema,
})
