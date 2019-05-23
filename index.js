const express = require("express");
const app = express();
const port = 5000;

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
