const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: String
    username: String
    display_name: String
    title: String
  }
  type Query {
    announcement: String
    user(id: String!): User
  }
  type Mutation {
    login(username: String, password: String): String
  }
`;

module.exports = typeDefs;
