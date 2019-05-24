const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Books_Schema = new Schema({
  title: String,
  author: String,
  description: String
});
module.exports = Books = mongoose.model("Books", Books_Schema, "Books");
