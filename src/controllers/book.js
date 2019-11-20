const express = require("express");
const Book = require("../models/book");

exports.bookById = async (req, res, next, id) => {
  const book = await Book.findById(id);

  try {
    if (!book) {
      return res.status(400).json({ error: "book not found" });
    }
    req.book = book;
    console.log(req.book);
    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getBooks = (req, res) => {};

exports.getBook = (req, res) => {};

exports.addBook = (req, res) => {};

exports.updateBook = (req, res) => {};

exports.deleteBook = (req, res) => {};
