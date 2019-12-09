const Book = require("../models/book");
const multer = require("multer");
const sharp = require("sharp");

exports.bookById = async (req, res, next, id) => {
  const book = await Book.findById(id);

  try {
    if (!book) {
      return res.status(400).json({ error: "book not found" });
    }
    req.book = book;
    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.timeline = async (req, res) => {
  const books = await Book.find({
    userId: req.params.userId,
    public: true
  })
    .select("image author name genre userId.name userId.avatar createdAt")
    .populate("userId", "name avatar");

  try {
    if (!books) {
      return res.status(400).send(e);
    }
    return res.status(200).send(books);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getBooks = async (req, res) => {
  const books = await Book.find({ userId: req.params.userId }).select("-image");
  try {
    if (!books) {
      return res.status(400).send(e);
    }
    return res.status(200).send(books);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getBook = (req, res) => {
  req.book.image = undefined;
  return res.send(req.book);
};

exports.addBook = async (req, res) => {
  const book = await new Book({ ...req.body });
  try {
    if (!book) {
      return res.status(400).send(e);
    }
    await book.save();
    return res.status(201).send(book);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      { _id: req.book._id },
      { $set: req.body },
      { new: true }
    );
    if (!book) {
      return res.status(400).send({ error: "Update was failed" });
    }
    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.book._id);
  try {
    if (!book) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send();
  } catch (e) {
    return res.status(400).send(e);
  }
};

// image

exports.upload = multer({
  // restricted file size
  limits: {
    fileSize: 1000000
  },
  // check whether filenames is for image or not
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please check your file out"));
    }
    cb(undefined, true);
  }
});

exports.uploadPhoto = async (req, res) => {
  // resized a image
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const book = await Book.findByIdAndUpdate(
      { _id: req.book._id },
      { image: buffer },
      { new: true }
    );
    if (!book) {
      return res.status(400).send({ error: "Update was failed" });
    }
    res.status(200).send(book);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book || !book.image) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(book.image);
  } catch (e) {
    res.status(404).send();
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, {
      evaluation: req.body.evaluation
    });

    if (!book) {
      return res.status(400).send({ error: "update was failed" });
    }
    await book.save();
    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateStartDate = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, {
      startDate: req.body.startDate
    });

    if (!book) {
      return res.status(400).send({ error: "update was failed" });
    }
    await book.save();
    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateEndDate = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, {
      endDate: req.body.endDate
    });

    if (!book) {
      return res.status(400).send({ error: "update was failed" });
    }
    await book.save();
    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateReadPages = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, {
      read_pages: req.body.read_pages
    });

    if (!book) {
      return res.status(400).send({ error: "update was failed" });
    }
    await book.save();
    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
};
