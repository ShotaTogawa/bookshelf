const express = require("express");
const router = express.Router();
const { bookById } = require("../controllers/book");
const { userById } = require("../controllers/user");

router.get("/books");
router.post("/books");
router.get("/books/:userId/bookId");
router.put("/books/:userId/bookId");
router.delete("/books/:userId/bookId");

router.param("BookId", bookById);
router.param("userId", userById);

module.exports = router;
