const express = require("express");
const server = express();
const port = process.env.PORT || 3000;
server.get("/", (req, res) => {
  res.send({
    message: "Welcome to server"
  });
});

server.listen(port, () => {
  console.log("server is running up ", port);
});
