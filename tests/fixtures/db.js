const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Book = require("../../src/models/book");
const Memo = require("../../src/models/memo");

const setupDatabase = async () => {
  await User.deleteMany();
  await Book.deleteMany();
  await Memo.deleteMany();
};

module.exports = {
  setupDatabase
};
