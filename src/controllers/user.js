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

exports.getUserInfo = (req, res) => {
  console.log(req.profile, req.user);
  return res.send(req.profile);
};

// update user info
exports.updateUserInfo = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ error: "Update was failed" });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.profile._id });
    if (!user) {
      res.status(400).send();
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};
