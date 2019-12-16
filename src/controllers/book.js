const Book = require("../models/book");
const multer = require("multer");

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

exports.getAllBooks = async (req, res) => {
  const books = await Book.find({ userId: req.params.userId }).select(
    "genre status purchased_price"
  );
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
      startDate: req.body.startDate,
      status: req.body.status
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
      endDate: req.body.endDate,
      status: req.body.status
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

exports.searchedBooks = async (req, res) => {
  const query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }

  const books = await Book.find(query)
    .where("userId")
    .equals(req.params.userId);

  try {
    if (!books) {
      return res.send("Not found");
    }
    return res.send(books);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({
      userId: req.params.userId,
      status: req.query.status
    });
    if (!books) {
      return res.status(400).send(e);
    }
    return res.status(200).send(books);
  } catch (e) {
    return res.status(400).send(e);
  }
};
