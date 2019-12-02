const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// signup
exports.signup = async (req, res) => {
  const user = new User({ ...req.body });
  try {
    await user.save();
    user.salt = undefined;
    user.hashed_password = undefined;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 60 * 60 * 24 * 7 });
    return res.status(201).send({ user, token });
  } catch (e) {
    return res.status(400).send(e);
  }
};
// sigiin
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  try {
    await user.authenticate(password);
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 60 * 60 * 24 * 7 });
    user.salt = undefined;
    user.hashed_password = undefined;
    return res.status(201).send({ user, token });
  } catch (e) {
    return res.status(400).send({ message: e });
  }
};
// signout
exports.signout = async (req, res) => {
  // delete cookie info
  res.clearCookie("t");
  res.send({ message: "Signout succuess" });
};

// requiredSignin
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});

//isAuth
exports.isAuth = async (req, res, next) => {
  // check wethere a user is authenticated
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).send({ message: "Access denied" });
  }
  next();
};
