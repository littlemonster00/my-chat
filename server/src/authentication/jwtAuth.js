const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.MY_SECRET);
      if (userId) return next();
    } catch (error) {
      return res.send({ error });
    }
  } else {
    return res.send({ message: "Token have not provided" });
  }
};
module.exports = jwtAuth;
