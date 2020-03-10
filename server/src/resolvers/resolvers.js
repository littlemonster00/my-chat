const jwt = require("jsonwebtoken");
const { User } = require("../mongoose/schema");
const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      const user = await User.findById(id);
      return user;
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
    }
  }
};

module.exports = resolvers;
