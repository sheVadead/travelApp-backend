const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = model("User", userSchema);
