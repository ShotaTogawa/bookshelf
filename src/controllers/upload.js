const AWS = require("aws-sdk");
const uuidv1 = require("uuidv1");
const Book = require("../models/book");
const User = require("../models/user");

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  signatureVersion: "v4",
  region: "us-west-2"
});

exports.getPresignedURL = async (req, res) => {
  if (req.params.bookId) {
    const key = `${req.params.userId}/${req.params.bookId}/${uuidv1()}.jpeg`;

    const url = await s3.getSignedUrl("putObject", {
      Bucket: "bookshelf-bucket",
      ContentType: "image/jpeg",
      Key: key
    });

    try {
      if (!url) {
        res.send("something wrong");
      }
      res.send({ key, url });
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  } else {
    const key = `${req.params.userId}/${uuidv1()}.jpeg`;
    const url = await s3.getSignedUrl("putObject", {
      Bucket: "bookshelf-bucket",
      ContentType: "image/jpeg",
      Key: key
    });

    try {
      if (!url) {
        res.send("something wrong");
      }
      res.send({ key, url });
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }
};

exports.updateImage = async (req, res) => {
  if (req.params.bookId) {
    try {
      const book = await Book.findByIdAndUpdate(
        { _id: req.params.bookId },
        {
          image: req.body.imageUrl
        },
        { new: true }
      );

      if (!book) {
        res.send("book is not found");
      }

      await book.save();
      res.send(book);
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        {
          avatar: req.body.avatar
        },
        { new: true }
      );
      if (!user) {
        res.send("user is not found");
      }

      await user.save();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  }
};
