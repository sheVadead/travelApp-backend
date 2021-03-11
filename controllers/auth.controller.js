const config = require("../config/auth.config");
const User = require("../models/User");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const { photoUpload } = require("../middlewares/avatarUpload");

exports.signup = async (req, res) => {
  if (req.body.password && req.body.password.length < 6) {
    res.status(500).send({
      message: "Invalid password",
    });
    return;
  }
  const photoData = await photoUpload(req.file.path);
  const user = new User({
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    avatar: photoData.secure_url,
  });

  user.save((err, user) => {
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
