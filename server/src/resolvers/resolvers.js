const jwt = require("jsonwebtoken");
const moment = require("moment");
const { User, Message } = require("../mongoose/schema");

const resolvers = {
  User: {
    messages: async (parent, { skip = 0, limit = 0 }) => {
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
    user: async (parent, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    loadMessages: async (
      parent,
      { author, skip = 0, limit = 0 },
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
    addMessage: async (parent, { text }) => {
      const message = new Message({
        text,
        author,
        createdAt: moment(),
        lastSeen: undefined
      });
      await message.save();
      return message;
    }
  }
};

module.exports = resolvers;
