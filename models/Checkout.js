const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkout_schema = Schema({
  email: {
    type: String,
    required: true
  },
  book_id: {
    type: String,
    required: true
  },
  book_title: {
    type: String,
    required: true
  }
});

module.exports = Checkout = mongoose.model(
  "Checkout",
  checkout_schema,
  "Checkout_Books"
);
