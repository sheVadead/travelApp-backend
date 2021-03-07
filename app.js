const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const Country = require("./models/Countries");
require("dotenv/config");

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);
const db = mongoose.connection;

const postsRoute = require("./routes/posts");
const getRoute = require("./routes/get");

app.use(bodyParser.json());
app.use("/countries", getRoute);
//Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

app.listen(3000);
