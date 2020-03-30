const notAuthenticated = ({ error, token }) => {
  return {
    error,
    token
  };
};

module.exports = { notAuthenticated };
