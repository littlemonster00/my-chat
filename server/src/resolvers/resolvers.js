const jwt = require("jsonwebtoken");
const moment = require("moment");
const { User, Message } = require("../mongoose/schema");

const author = "5e6718b00c3e8966f7e9360a";
const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    loadMessages: async () => {
      const messages = await Message.find({ author });
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
