const express = require("express");
const router = express.Router();
const Countries = require("../models/Countries");
const User = require("../models/User");

router.get("/get-avatar/:login", async (req, res) => {
  const user = await User.find({ login: req.params.login });
  res.send(user);
});

module.exports = router;
