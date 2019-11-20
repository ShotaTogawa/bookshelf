const express = require("express");
const app = express();
require("./db/mongoose");
const authRouter = require("./router/auth");

app.use(authRouter);

module.exports = app;
