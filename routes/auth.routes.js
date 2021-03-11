require("dotenv").config();
const controller = require("../controllers/auth.controller");
const { checkDuplicateUsernameOrEmail } = require("../middlewares");
const multer = require("multer");
const path = require("path");
const loader = multer({
  dest: path.join(__dirname, "tmp"),
});
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      " Access-Control-Allow-Methods",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.post(
  //   "/api/auth/signup",
  //   loader.single("avatar"),
  // );

  app.post(
    "/api/auth/signup",
    loader.single("avatar"),
    checkDuplicateUsernameOrEmail,
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
