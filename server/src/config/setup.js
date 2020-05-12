require("./mongo-db");

const { User, Message, Channel } = require("../mongoose/schema");

async function setup() {
  console.log("hihihii");
  const userIds = [];
  for (let i = 0; i < 4; i++) {
    try {
      const user = new User({
        username: `user${i}`,
        email: `user${i}@gmail.com`,
        password: "12345Aa@",
        avatar: "",
        display_name: `user${i}`,
        title: `user${i}`,
      });
      userIds.push(user._id);
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }

  channels = [];
  for (let i = 0; i < 3; i++) {
    const channel = new Channel({
      participant: [userIds[i], userIds[i + 1]],
      messages: [],
      createdAt: new Date(),
    });
    channels.push(channel);
    await channel.save();
  }

  // initialize messages
  const messges = [];
  for (let i = 0; i < 10; i++) {
    const message = new Message({
      text: `messages ${i}`,
      author: userIds[Math.floor(Math.random() * Math.floor(2))],
      channel: channels[0],
      createdAt: new Date(),
    });
    await Channel.sendMessage(message);
  }
  return userIds;
}
(async function main() {
  console.log("asdhfishidf");
  let setupdb = await setup();
  console.log(setupdb);
  console.log("234234");
})();
