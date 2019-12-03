// userModel.js
var mongoose = require("mongoose");

var answerSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  pollId: {
    type: String,
    required: true
  },
  selectedOption: {
    type: String,
    required: true
  },
});

var Answer = (module.exports = mongoose.model("answer", answerSchema));
module.exports.get = function(callback, limit) {
  Answer.find(callback).limit(limit);
};
