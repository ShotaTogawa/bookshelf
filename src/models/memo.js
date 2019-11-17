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
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Memo", memoSchema);
