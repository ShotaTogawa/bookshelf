const express = require("express");
const router = express.Router();
const {
  bookById,
  addBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  timeline,
  updateEndDate,
  updateStartDate,
  updateEvaluation,
  updateReadPages,
  searchedBooks
} = require("../controllers/book");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth");

router.get("/timeline/:userId", requireSignin, isAuth, timeline);
router.get("/books/:userId", requireSignin, isAuth, getBooks);
router.get("/books/search/:userId", requireSignin, isAuth, searchedBooks);
router.post("/books/:userId", requireSignin, isAuth, addBook);
router.get("/books/:userId/:bookId", requireSignin, isAuth, getBook);
router.put("/books/:userId/:bookId", requireSignin, isAuth, updateBook);
router.delete("/books/:userId/:bookId", requireSignin, isAuth, deleteBook);
router.put(
  "/book/evaluation/:userId/:bookId",
  requireSignin,
  isAuth,
  updateEvaluation
);
router.put(
  "/book/startdate/:userId/:bookId",
  requireSignin,
  isAuth,
  updateStartDate
);
router.put(
  "/book/enddate/:userId/:bookId",
  requireSignin,
  isAuth,
  updateEndDate
);
router.put(
  "/book/read_pages/:userId/:bookId",
  requireSignin,
  isAuth,
  updateReadPages
);

router.param("bookId", bookById);
router.param("userId", userById);

module.exports = router;
