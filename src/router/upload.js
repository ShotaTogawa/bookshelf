const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { bookById } = require("../controllers/book");
const { getPresignedURL, updateImage } = require("../controllers/upload");

router.get("/upload/:userId", requireSignin, isAuth, getPresignedURL);
router.get("/upload/:userId/:bookId", requireSignin, isAuth, getPresignedURL);
router.put("/upload/:userId", requireSignin, isAuth, updateImage);
router.put("/upload/:userId/:bookId", requireSignin, isAuth, updateImage);

router.param("userId", userById);
router.param("bookId", bookById);

module.exports = router;
