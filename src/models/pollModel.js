// userModel.js
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var answerSchema = require("./answerModel");

const answerSchema = Schema({
  type: { type: Schema.Types.ObjectId, ref: "answerS" }
});

var answer = mongoose.model("answerS", answerSchema);

var pollSchema = mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  usersAnswer: {
    type: [String],
    required: false
  }
});

var Poll = (module.exports = mongoose.model("poll", pollSchema));
module.exports.get = function(callback, limit) {
  Poll.find(callback).limit(limit);
};
