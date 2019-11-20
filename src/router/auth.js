const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login");
router.get("/logout");

module.exports = router;
