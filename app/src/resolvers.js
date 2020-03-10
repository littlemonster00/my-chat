import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";

export const typeDefs = gql`
  type User {
    _id: String
    username: String
  }
  extend type Query {
    announcement: String
    user: User
  }
  extend type Mutation {
    login(username: String!, password: String!): String!
  }
`;

export const resolvers = {
  Query: {
    announcement: () => "hsidfhisf"
  }
};
