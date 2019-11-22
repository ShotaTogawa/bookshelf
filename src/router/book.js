const express = require("express");
const router = express.Router();
const {
  bookById,
  addBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook
} = require("../controllers/book");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth");

router.get("/books/:userId", getBooks);
router.post("/books/:userId", requireSignin, isAuth, addBook);
router.get("/books/:userId/:bookId", requireSignin, isAuth, getBook);
router.put("/books/:userId/:bookId", requireSignin, isAuth, updateBook);
router.delete("/books/:userId/:bookId", requireSignin, isAuth, deleteBook);

// todo
// register pic
// get pic

router.param("bookId", bookById);
router.param("userId", userById);

module.exports = router;
