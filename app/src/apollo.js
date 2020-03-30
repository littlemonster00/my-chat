import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  from,
  split
} from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem("authorization") || null
    }
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("authorization") || null
    }
  }));

  return forward(operation);
});

const activityMiddleware = new ApolloLink((operation, forward) => {
  // add the recent-activity custom header to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "recent-activity": localStorage.getItem("lastOnlineTime") || null
    }
  }));

  return forward(operation);
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  link: from([authMiddleware, activityMiddleware, splitLink]),
  cache: new InMemoryCache()
});
