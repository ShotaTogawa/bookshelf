const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
  res.send({ user: req.profile });
});

router.get("/user/:userId");
router.put("/user/:userId");
router.delete("/user/:userId");

router.param("userId", userById);

module.exports = router;
