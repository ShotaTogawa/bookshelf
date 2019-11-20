const mongoose = require("mongoose");
const validator = require("validator");
const Book = require("./book");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      }
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    avatar: {
      type: Buffer,
      default: null
    }
  },
  { timestamps: true }
);

// set virtual to user
userSchema.virtual("Book", {
  ref: "Book",
  localField: "_id",
  foreignField: "userId"
});

// when a user was deleted, delete books realated to user
userSchema.pre("remove", async function(next) {
  const user = this;
  await Book.deleteMany({ userId: user._id });
  next();
});

module.exports = mongoose.model("User", userSchema);
