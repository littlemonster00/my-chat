const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: String,
  password: String,
  display_name: String,
  title: String,
  avatar: String
});

// Message Schema
const messageSchema = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channel"
  },
  createdAt: String,
  lastSeen: String
});

// Channel Schema
const channelSchema = new Schema({
  participant: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
  createdAt: String
});

// Send messages method
channelSchema.statics.sendMessage = async function(message) {
  const proSendMessage = new Promise(async (resolve, reject) => {
    const messageInstance = await new Message(message).save();
    try {
      const channel = await this.findById(message.channel);
      channel.messages.push(messageInstance._id);
      await channel.save();
    } catch (error) {
      reject(error);
    }
    resolve(messageInstance);
  });
  return proSendMessage;
};

// Decleration models
const User = mongoose.model("User", userSchema);
const Message = mongoose.model("Message", messageSchema);
const Channel = mongoose.model("Channel", channelSchema);

// const channel = new Channel({
//   participant: ["5e6718b00c3e8966f7e9360a", "5e69d64eabe1e90486427fea"],
//   messages: []
// }).save();
//   .then(channel => console.log(channel))
//   .catch(error => console.log(error));

// const message = new Message({
//   text: "what's bor. i am here...2",
//   author: "5e6718b00c3e8966f7e9360a",
//   channel: "5e69e0a5a147b856f520ecda"
// });
// channel = Channel.findById("5e69e0a5a147b856f520ecda").then(channel => {
//   channel.sendMessage(message, msgSend => {
//     console.log(msgSend);
//   });
// });

module.exports = { User, Message, Channel };
