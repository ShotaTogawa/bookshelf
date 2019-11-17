const express = require("express");
const router = express.Router();

router.get("/user/:userId");
router.put("/user/:userId");
router.delete("/user/:userId");

module.exports = router;
