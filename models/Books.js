const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  athor: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
module.exports = Books = mongoose.model("Books", BooksSchema);
