const express = require("express");
const router = express.Router();

router.get("/books/:userId/:bookId/memo");
router.post("/books/:userId/:bookId/memo");
router.get("/books/:userId/:bookId/memo/:memoId");
router.put("/books/:userId/:bookId/memo/:memoId");
router.delete("/books/:userId/:bookId/memo/:memoId");

module.exports = router;
