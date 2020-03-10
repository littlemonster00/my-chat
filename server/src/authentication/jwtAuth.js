const jwtAuth = (req, res, next) => {
  return next();
  if (req.body.token === "authenticated") {
    return next();
  } else {
    res.send({ error: "Not authenticated" });
  }
};
module.exports = jwtAuth;
