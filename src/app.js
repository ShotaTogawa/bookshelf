const express = require("express");
const app = express();
require("./db/mongoose");
const authRouter = require("./router/auth");

app.use(express.json());
app.use("/api", authRouter);

module.exports = app;
