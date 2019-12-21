const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const bookRouter = require("./router/book");
const memoRouter = require("./router/memo");
const uploadRouter = require("./router/upload");

if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
} else {
  require("./db/mongoose");
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", memoRouter);
app.use("/api", uploadRouter);

module.exports = app;
