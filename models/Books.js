const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Books_Schema = new Schema({
  title: String,
  author: String,
  description: String,
  available: {
    type: Boolean,
    default: true
  }
});
module.exports = Books = mongoose.model("Books", Books_Schema, "Books");
