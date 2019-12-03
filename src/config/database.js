const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb://admin:admin2311@ds141198.mlab.com:41198/crud-eventos",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
