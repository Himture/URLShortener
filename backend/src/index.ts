import { createYoga } from "graphql-yoga"
import pscale from "./pscale";
import { schema } from "./schema";

export interface Env {}

const yoga = createYoga({
	schema,
})

export default {
	fetch: yoga.fetch,
};