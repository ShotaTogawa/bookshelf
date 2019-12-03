const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
      ref: "Book"
    },
    userId: {
      type: String,
      required: true,
      trim: true
    },
    memo: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Memo", memoSchema);
