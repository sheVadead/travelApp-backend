const config = require("../config/auth.config");
const User = require("../models/User");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const { photoUpload } = require("../middlewares/avatarUpload");

exports.signup = async (req, res, c) => {
  // console.log(res.secure_url);
  // console.log(res);
  // console.log('controleler', req, res, c);
  // console.log('body', req.body);
  // console.log(uploadPhoto)

  console.log(photoUpload);

  if (req.body.password && req.body.password.length < 6) {
    res.status(500).send({
      message: "Invalid password length",
    });
    return;
  }

  const photoData = await photoUpload(req.body.avatar);

  console.log("before save", photoData);

  const user = new User({
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8),
    avatar: photoData,
  });

  console.log("before before save");

  user.save((err, user) => {
    console.log(err, user);
    // return;

    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }

    res.send({
      message: "User was registered successfully!",
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    login: req.body.login,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign(
        {
          id: user.id,
        },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        accessToken: token,
      });
    });
};
