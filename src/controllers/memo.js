const Memo = require("../models/memo");

exports.memoById = async (req, res, next, id) => {
  const memo = await Memo.findById(id);

  try {
    if (!memo) {
      return res.status(400).json({ error: "memo not found" });
    }
    req.memo = memo;
    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getMemos = async (req, res) => {
  const memo = await Memo.find({
    userId: req.params.userId,
    bookId: req.params.bookId
  }).limit(5);
  try {
    if (!memo) {
      return res.status(400).send("memo was not found");
    }
    res.send(memo);
  } catch (e) {
    return res.status(400).send(e);
  }
};
exports.takeMemo = async (req, res) => {
  const memo = await new Memo({ ...req.body });
  try {
    if (!memo) {
      res.status(400).send("failed");
    }
    await memo.save();
    res.status(201).send(memo);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.getMemo = async (req, res) => {
  const memo = await Memo.findById(req.memo._id);
  try {
    if (!memo) {
      return res.send("Something wrong");
    }
    res.status(200).send(memo);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateMemo = async (req, res) => {
  try {
    const memo = await Memo.findByIdAndUpdate(
      { _id: req.memo._id },
      { memo: req.body.memo },
      { new: true }
    );
    if (!memo) {
      res.status(400).send("Something wrong");
    }
    await memo.save();
    res.status(201).send(memo);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.deleteMemo = async (req, res) => {
  try {
    const memo = await Memo.findByIdAndDelete(req.memo._id);
    res.status(200).send(memo);
  } catch (e) {
    res.status(400).send(e);
  }
};
