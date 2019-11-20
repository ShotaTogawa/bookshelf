const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  userFindAndModify: true,
  useUnifiedTopology: true
});

module.exports = mongoose;
