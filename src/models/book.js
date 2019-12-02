const mongoose = require("mongoose");
const Memo = require("./memo");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: null
    },
    image: {
      type: Buffer,
      default: null
    },
    page_nums: {
      type: Number,
      required: true
    },
    read_pages: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    userId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "beforeReading"
    },
    evaluation: {
      type: Number,
      default: 0
    },
    purchased_price: {
      type: Number,
      default: null
    },
    read_time: {
      type: Array
    }
  },
  { timestamps: true }
);

// set virtual field to memo
bookSchema.virtual("Memo", {
  ref: "Memo",
  localField: "_id",
  foreignField: "bookId"
});
// when a book was deleted, delete memo related to the book
bookSchema.pre("remove", async function(next) {
  const book = this;
  await Memo.deleteMany({ bookId: book._id });
  next();
});

module.exports = mongoose.model("Book", bookSchema);
