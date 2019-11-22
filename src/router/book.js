const express = require("express");
const router = express.Router();
const {
  bookById,
  addBook,
  getBooks,
  getBook,
  deleteBook
} = require("../controllers/book");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth");

router.get("/books", getBooks);
router.post("/books/:userId", requireSignin, isAuth, addBook);
router.get("/books/:userId/:bookId", requireSignin, isAuth, getBook);
router.put("/books/:userId/:bookId");
router.delete("/books/:userId/:bookId", requireSignin, isAuth, deleteBook);

router.param("bookId", bookById);
router.param("userId", userById);

module.exports = router;
