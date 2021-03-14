const express = require("express");
const router = express.Router();
const Countries = require("../models/Countries");
const User = require("../models/User");
router.get("/", async (req, res) => {
  const coutnries = await Countries.find({});

  res.send(coutnries);
});

router.get("/:iso", async (req, res) => {
  const country = await Countries.find({ iso: req.params.iso });
  res.send(country);
});

module.exports = router;
