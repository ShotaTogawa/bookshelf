const express = require("express");
const router = express.Router();

router.get("/books");
router.post("/books");
router.get("/books/:userId/bookId");
router.put("/books/:userId/bookId");
router.delete("/books/:userId/bookId");

module.exports = router;
