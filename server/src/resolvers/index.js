const resolvers = {
  Query: {
    announcement: () =>
      `Say hello to the new Apollo Server! A production ready GraphQL server with an incredible getting started experience.`
  },
  Mutation: {
    login: (parent, { username, password }) => {
      if ((username === "sangle", password === "123abc")) return "sangle123abc";
    }
  }
};

module.exports = resolvers;
