const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: String
    username: String
    display_name: String
    title: String
  }
  type Message {
    text: String
    author: String!
    createdAt: String
    lastSeen: String
  }
  type Query {
    announcement: String
    user(id: String!): User
    loadMessages: [Message]
  }
  type Mutation {
    login(username: String, password: String): String
    addMessage(text: String): Message
  }
`;

module.exports = typeDefs;
