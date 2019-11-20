const express = require("express");
const app = express();
require("./db/mongoose");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const bookRouter = require("./router/book");

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", bookRouter);

module.exports = app;
