const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

var mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/Library";

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const Books = require("./models/Books");
const User = require("./models/User");
const Checkout = require("./models/Checkout");

const cors = require("cors");
app.use(cors());

process.env.SECRET_KEY = "secret";

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
app.put("/books/:id/checkout/:user", (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.id);
  Books.updateOne({ _id: id }, { $set: { available: false } }, function(
    err,
    result
  ) {
    Books.findOne(id).then(responce => {
      var checkedoutBook = {
        email: req.params.user,
        book_id: responce._id,
        book_title: responce.title
      };
      Checkout.create(checkedoutBook)
        .then(resp => {
          res.status(200).send({ status: resp.book_title + " added" });
        })
        .catch(err => {
          res.status(401).send(err + "  UnSuccessful");
        });
    });
    res.json(result);
  });
});

app.post("/user/register", (req, res) => {
  console.log(req.body);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  User.findOne({
    email: req.body.email
  }).then(newuser => {
    if (!newuser) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        user.password = hash;
        User.create(user)
          .then(newuser => {
            res.json({ status: newuser.email + " registered" });
          })
          .catch(err => {
            res.send(err);
          });
      });
    } else {
      res.json({ error: err });
    }
  });
});
app.post("/user/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //res.send(req.body.password);
        //res.send(user.password);
        const payload = {
          _id: user._id,
          email: user.email
        };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 3220
        });
        res.send(token);
      } else {
        res.status(401).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(401).send("error" + err);
    });
});
// app.get("checkout/:id", (req, res) => {
//   var decoded = jwt.verify(
//     req.headers["authorization"],
//     process.env.SECRET_KEY
//   );
//   res.send(decoded);

// });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
