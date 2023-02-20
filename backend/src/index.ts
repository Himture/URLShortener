import { gql } from "./graphql/gql";
import { createServer } from "http";

export default {
  fetch: gql.fetch,
};
