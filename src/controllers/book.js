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

exports.deleteBook = (req, res) => {};
