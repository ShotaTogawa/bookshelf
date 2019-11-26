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
  try {
  } catch (e) {}
};
exports.takeMemo = async (req, res) => {};
exports.getMemo = async (req, res) => {};
exports.updateMemo = async (req, res) => {};
exports.deleteMemo = async (req, res) => {};
