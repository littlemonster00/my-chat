const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: String
    username: String
    display_name: String
    title: String
    avatar: String
    messages(skip: Int, limit: Int): [Message]
  }
  type Message {
    id: String
    text: String
    author: User
    createdAt: String
    lastSeen: String
  }
  type Channel {
    participant: [User!]
    messages: [Message]
  }
  type Query {
    channel(id: String!): Channel
    announcement: String
    user(id: String!): User
    loadMessages(author: String!, skip: Int, limit: Int): [Message]
  }
  type Mutation {
    login(username: String, password: String): String
    sendMessage(text: String, channel: String!): Message
  }
`;

module.exports = typeDefs;
