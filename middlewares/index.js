const checkDuplicateUsernameOrEmail = require("./verifySignUp");
const verifyToken = require("./authJWT");

module.exports = { checkDuplicateUsernameOrEmail, verifyToken };
