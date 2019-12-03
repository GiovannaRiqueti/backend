// userController.js
// Import user model
Answer = require("../models/answerModel");
// Handle index actions
exports.index = function(req, res) {
  Answer.get(function(err, answer) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Answer retrieved successfully",
      data: answer
    });
  });
};
// Handle create user actions
exports.new = function(req, res) {
  var answer = new Answer();
  // Body is getting empty here
  answer.userId = req.body.userId ? req.body.userId : answer.userId;
  answer.pollId = req.body.pollId ? req.body.pollId : answer.pollId;
  answer.selectedOption = req.body.selectedOption ? req.body.selectedOption : answer.selectedOption;
  // save the answer and check for errors
  answer.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New answer created!",
      data: answer
    });
  });
};

// Handle update user info
exports.update = function(req, res) {
  Answer.findById(req.body.answer_id, function(err, answer) {
    if (err) res.send(err);
    answer.userId = req.body.userId ? req.body.userId : answer.userId;
    answer.pollId = req.body.pollId ? req.body.pollId : answer.pollId;
    answer.selectedOption = req.body.selectedOption ? req.body.selectedOption : answer.selectedOption;
    // save the user and check for errors
    answer.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Answer Info updated",
        data: answer
      });
    });
  });
};

// Handle view user info
exports.view = function(req, res) {
  Answer.findById(req.params.answer_id, function(err, answer) {
    if (err) res.send(err);
    res.json({
      message: "Answer details loading..",
      data: answer
    });
  });
};

// Handle delete user
exports.delete = function(req, res) {
  Answer.remove(
    {
      _id: req.params.answer_id
    },
    function(err, answer) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Answer deleted"
      });
    }
  );
};
