const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { bookById } = require("../controllers/book");
const {
  memoById,
  getMemos,
  takeMemo,
  getMemo,
  updateMemo,
  deleteMemo
} = require("../controllers/memo");

router.get("/books/:userId/:bookId/memo", requireSignin, isAuth, getMemos);
router.post("/books/:userId/:bookId/memo", requireSignin, isAuth, takeMemo);
router.get(
  "/books/:userId/:bookId/memo/:memoId",
  requireSignin,
  isAuth,
  getMemo
);
router.put(
  "/books/:userId/:bookId/memo/:memoId",
  requireSignin,
  isAuth,
  updateMemo
);
router.delete(
  "/books/:userId/:bookId/memo/:memoId",
  requireSignin,
  isAuth,
  deleteMemo
);

router.param("userId", userById);
router.param("bookId", bookById);
router.param("memoId", memoById);

module.exports = router;
