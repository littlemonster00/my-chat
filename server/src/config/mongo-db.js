const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/graphqldb" || process.env.MONGO_URI;
// const url = process.env.MONGO_URI;
mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once("open", () =>
  console.log(`Connected to mongo at: ${url}`)
);

/* const User = require("../mongoose/schema");
const user = new User({ username: "sangle", password: "123abc" });
user
  .save()
  .then(user => {
    console.log(user);
  })
  .catch(error => {
    console.log(error);
  });
 */
