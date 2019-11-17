const mongoose = require("mongoose");
const validator = require("validator");

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

// when a user was deleted, delete books realated to user

module.exports = mongoose.model("User", userSchema);
