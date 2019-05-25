const express = require("express");

const app = express();
const port = 5000;

var mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/Books";

const Books = require("./models/Books");

const cors = require("cors");
app.use(cors());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books", (req, res) => {
  Books.find({ available: "true" }).exec(function(err, books) {
    if (err) {
      res.send("something is wrong");
    } else {
      res.json(books);
    }
  });
});
app.put("/books/:id/checkout", (req, res) => {
  //res.send(req.params.id);
  var id = mongoose.Types.ObjectId(req.params.id);
  Books.update({ _id: id }, { $set: { available: false } }, function(
    err,
    result
  ) {
    res.send(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
