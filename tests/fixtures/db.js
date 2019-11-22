const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Book = require("../../src/models/book");
const Memo = require("../../src/models/memo");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "mike",
  email: "mike@test.com",
  password: "123456",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

const bookOneId = new mongoose.Types.ObjectId();
const bookTwoId = new mongoose.Types.ObjectId();

const bookOne = {
  _id: bookOneId,
  name: "book one",
  genre: "action",
  author: "Mr. action",
  page_nums: "280",
  purchased_price: "150",
  userId: userOneId
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Book.deleteMany();
  await Memo.deleteMany();
  await new User(userOne).save();
  await new Book(bookOne).save();
};

module.exports = {
  setupDatabase,
  userOneId,
  userOne,
  bookOneId,
  bookOne
};
