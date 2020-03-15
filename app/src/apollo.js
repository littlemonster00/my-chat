import { ApolloClient, HttpLink, ApolloLink, from } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || null
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

export default new ApolloClient({
  link: from([authMiddleware, activityMiddleware, httpLink]),
  cache: new InMemoryCache()
});
