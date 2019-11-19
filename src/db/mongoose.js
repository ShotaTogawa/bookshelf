const mongoose = reuqire("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  userFindAndModify: true
});

module.exports = mongoose;
