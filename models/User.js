const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users_Schema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});
module.exports = User = mongoose.model("User", users_Schema, "Users");
