require("dotenv").config();
const controller = require("../controllers/auth.controller");
const { checkDuplicateUsernameOrEmail } = require("../middlewares");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

cloudinary.config({
  cloud_name: "shevadead",
  api_key: "557182435385558",
  api_secret: "OgGKzWVQA1l_HTp-yNOOkKAOv-k",
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
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
    checkDuplicateUsernameOrEmail,

    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
