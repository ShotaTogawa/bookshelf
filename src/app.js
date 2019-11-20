const express = require("express");
const app = express();
require("./db/mongoose");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);

module.exports = app;
