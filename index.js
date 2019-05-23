const express = require("express");
const app = express();
const port = 5000;
var mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/Books";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/books", (req, res) => {
  const books = [
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/91WJQeRImJL.jpg",
      title: "Super Heros",
      author: "Ravi",
      description: ".........."
    }
  ];
  res.send(books);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
