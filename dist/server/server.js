"use strict";
var express = require("express");
var server = express();
var port = process.env.PORT || 3000;
server.get("/", function (req, res) {
    res.send({
        message: "Welcome to server"
    });
});
server.listen(port, function () {
    console.log("server is running up ", port);
});
