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
    id: String
    participant: [User!]
    messages(offset: Int, limit: Int): [Message]
  }
  type Query {
    channel(id: String!): Channel
    announcement: String
    user(id: String!): User
    messagesOnChannel(channelId: String!, offset: Int, limit: Int): [Message]
  }
  type Mutation {
    login(username: String, password: String): Login
    sendMessage(text: String, channel: String!): Message
  }
  type Subscription {
    hello: String
    newMessageOnChannel(channelId: String!): Message!
  }
  type Login {
    error: String
    token: String
  }
`;

module.exports = typeDefs;
