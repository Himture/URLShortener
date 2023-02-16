// import { createYoga } from "graphql-yoga";
// import pscale from "./pscale";
// import { schema } from "./graphql/schema";

// export interface Env {}

// const yoga = createYoga({
//   schema,
// });

// export default {
//   fetch: yoga.fetch,
// };

require("dotenv").config();
const { GraphQLServer } = require("graphql-yoga");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs } = require("./graphql/schema.graphql");
const resolvers = require("./auth/resolvers");
const { createContext } = require("./auth");
const { createConnection } = require("./db");
const { getShortUrl, createShortUrl } = require("./db/shortUrls");

const PORT = process.env.PORT || 3000;

// Create a MySQL connection pool
const db = createConnection();

// Create the GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create the GraphQL server instance
const server = new GraphQLServer({
  schema,
  context: createContext,
});

// Define the server routes
server.get("/healthcheck", (req:Request , res:Response) => {
  res.status(200).send("OK");
});

server.post("/shorten", async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createShortUrl(db, url);
  res.status(201).send(shortUrl);
});

server.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const shortUrl = await getShortUrl(db, shortId);

  if (shortUrl) {
    res.redirect(shortUrl, 301);
  } else {
    res.status(404).send("Not found");
  }
});

// Start the server
server.start({ port: PORT }, () => {
  console.log(`Server is listening on port ${PORT}`);
});
