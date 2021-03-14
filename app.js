const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv/config");
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);
mongoose.set("useFindAndModify", false);
app.use(cors());
// app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getRouteCountries = require("./routes/getCountries");
const getRoutUsers = require("./routes/getUsers");

app.use("/countries", getRouteCountries);

app.use("/users", getRoutUsers);

app.get("/", (req, res) => {
  res.send("We are on home");
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
app.listen(process.env.PORT || 3000);
