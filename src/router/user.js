const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const {
  userById,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  getPhoto,
  upload,
  uploadPhoto
} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
  res.send({ user: req.profile });
});

router.get("/user/:userId", requireSignin, isAuth, getUserInfo);
router.put("/user/:userId", requireSignin, isAuth, updateUserInfo);
router.delete("/user/:userId", requireSignin, isAuth, deleteUser);
router.get("/user/avatar/:userId", requireSignin, isAuth, getPhoto);
router.post(
  "/user/avatar/:userId",
  requireSignin,
  isAuth,
  upload.single("avatar"),
  uploadPhoto
);

// todo
// register an avatar
// get an avatar

// calcurate reading status
// calcurate genre
// calcurate plan
// calcurate cost and time

router.param("userId", userById);

module.exports = router;
