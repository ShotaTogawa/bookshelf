const User = require("../models/user");

// put user info to req.profile
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).send({
        error: "User not found"
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    req.profile = user;
    next();
  });
};
// get user info

exports.getUserInfo = async (req, res) => {};

// update user info
exports.updateUserInfo = async (req, res) => {};

// delete user
exports.deleteUser = async (req, res) => {};
