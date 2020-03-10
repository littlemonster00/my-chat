const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  display_name: String,
  title: String
});
const messageSchema = new Schema({
  text: String,
  author: String,
  createdAt: String,
  lastSeen: String
});
// Decleration models
const User = mongoose.model("User", userSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = { User, Message };
