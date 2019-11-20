const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const {
  userById,
  getUserInfo,
  updateUserInfo,
  deleteUser
} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
  res.send({ user: req.profile });
});

router.get("/user/:userId", requireSignin, isAuth, getUserInfo);
router.put("/user/:userId", requireSignin, isAuth, updateUserInfo);
router.delete("/user/:userId", requireSignin, isAuth, deleteUser);

router.param("userId", userById);

module.exports = router;
