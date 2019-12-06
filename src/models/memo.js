const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
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
      required: true
    }
  },
  { timestamps: true }
);

const Memo = mongoose.model("Memo", memoSchema);
module.exports = Memo;
