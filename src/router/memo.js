const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { bookById } = require("../controllers/book");
const {
  getMemos,
  takeMemo,
  getMemo,
  updateMemo,
  deleteMemo
} = require("../controllers/memo");

router.get("/books/:userId/:bookId/memo", requireSignin, isAuth, getMemos);
router.post("/books/:userId/:bookId/memo", requireSignin, isAuth, takeMemo);
router.get("/books/:userId/:bookId/memo/:memoId", getMemo);
router.put("/books/:userId/:bookId/memo/:memoId", updateMemo);
router.delete("/books/:userId/:bookId/memo/:memoId", deleteMemo);

router.param("userId", userById);
router.param("bookId", bookById);

module.exports = router;
