const jwt = require("jsonwebtoken");
const moment = require("moment");
const { User, Message, Channel } = require("../mongoose/schema");

const resolvers = {
  User: {
    messages: async (parent, { skip = 0, limit = 20 }) => {
      limit = Math.min(20, limit);
      const messages = await Message.find({ author: parent._id })
        .skip(skip)
        .limit(limit);
      return messages;
    }
  },
  Message: {
    author: async parent => {
      const user = await User.findById(parent.author);
      return user;
    }
  },
  Query: {
    channel: async (parent, { id }) => {
      const channel = await Channel.findById(id).populate(
        "messages participant"
      );

      return channel;
    },
    user: async (parent, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    loadMessages: async (
      parent,
      { author, skip = 0, limit = 20 },
      context,
      info
    ) => {
      // Max limit equal 20 messages
      limit = Math.min(20, limit);
      const messages = await Message.find({ author })
        .skip(skip)
        .limit(limit);
      return messages;
    },
    announcement: () =>
      `Say hello to the new Apollo Server! A production ready GraphQL server with an incredible getting started experience.`
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username }, "password");
      if (user.password === password) {
        const token = jwt.sign({ id: user._id, username }, "123abc");
        return token;
      }
      return null;
    },
    sendMessage: async (parent, { text, channel }, context, info) => {
      try {
        const message = await Channel.sendMessage({
          channel,
          text,
          author: context.user.id,
          createdAt: moment(),
          lastSeen: undefined
        });
        return message;
      } catch (error) {
        return error;
      }
    }
  }
};

module.exports = resolvers;
