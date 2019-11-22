const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/mongoose");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const bookRouter = require("./router/book");
const memoRouter = require("./router/memo");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", memoRouter);

module.exports = app;
