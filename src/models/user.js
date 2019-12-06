const mongoose = require("mongoose");
const validator = require("validator");
const Book = require("./book");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

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

// make password hashed
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
