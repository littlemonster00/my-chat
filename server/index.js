const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require("body-parser");

const jwtAuth = require("./src/authentication/jwtAuth");
const resolvers = require("./src/resolvers");
const typeDefs = require("./src/typeDefs");
const port = process.env.PORT || 4000;

const app = express();
const path = "/graphql";

const server = new ApolloServer({ typeDefs, resolvers });

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
app.use(path, bodyParser.json(), jwtAuth);

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);