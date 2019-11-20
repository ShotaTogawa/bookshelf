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
    console.log(e);
    return res.status(400).send(e);
  }

  // find the user info registerd

  // if the user is found, create token

  // set token info for cookie

  // return response user info and cookie to client
};
// sigiin
exports.signin = async (req, res) => {};
// get user info from request

// check the user exists or not

// if the user exists, generate token

// set cookie if no error

// return response user info and token to client

// signout
exports.signout = async (req, res) => {
  // delete cookie info
};

// requiredSignin
// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: auth
// });

//isAuth
exports.isAuth = async (req, res) => {
  // check wethere a user is authenticated
};
