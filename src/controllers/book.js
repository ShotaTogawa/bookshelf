const express = require("express");
const Book = require("../models/book");

exports.bookById = async (req, res, next, id) => {
  const book = await Book.findById(id);

  try {
    if (!book) {
      return res.status(400).json({ error: "book not found" });
    }
    req.book = book;
    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getBooks = (req, res) => {};

exports.getBook = (req, res) => {
  req.book.image = undefined;
  return res.send(req.book);
};

exports.addBook = async (req, res) => {
  const book = await new Book({ ...req.body });
  try {
    if (!book) {
      return res.status(400).send(e);
    }
    await book.save();
    return res.status(201).send(book);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.updateBook = (req, res) => {};

exports.deleteBook = async (req, res) => {
  console.log(req.book);
  const book = await Book.findByIdAndDelete(req.book._id);
  try {
    if (!book) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send();
  } catch (e) {
    return res.status(400).send(e);
  }
};
