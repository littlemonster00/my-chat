const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    announcement: String
  }
`;

module.exports = typeDefs;
