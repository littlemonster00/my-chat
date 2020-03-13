require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const http = require("http");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const jwtAuth = require("./src/authentication/jwtAuth");
const resolvers = require("./src/resolvers/resolvers");
const typeDefs = require("./src/typeDefs/typeDefs");
const PORT = process.env.PORT || 4000;

require("./src/config/mongo-db");
const app = express();
const path = "/graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      const context = connection.context;
      return {
        ...context,
        pubsub
      };
    } else {
      const token = req.headers.token || "";
      return {
        token,
        pubsub
      };
    }
  }
});

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
app.use(path, bodyParser.json());
// app.use(path, bodyParser.json(), jwtAuth);

server.applyMiddleware({ app });

// Wrap the Express server
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
