import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";

export const typeDefs = gql`
  extend type Query {
    announcement: String
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
