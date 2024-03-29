// userModel.js
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var User = (module.exports = mongoose.model("user", userSchema));
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
