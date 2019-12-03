// userController.js
// Import user model
Poll = require("../models/pollModel");
// Handle index actions
exports.index = function(req, res) {
  Poll.get(function(err, poll) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Poll retrieved successfully",
      data: poll
    });
  });
};
// Handle create user actions
exports.new = function(req, res) {
  var poll = new Poll();
  // Body is getting empty here
  poll.ownerId = req.body.ownerId ? req.body.ownerId : poll.ownerId;
  poll.title = req.body.title ? req.body.title : poll.title;
  poll.description = req.body.description
    ? req.body.description
    : poll.description;
  poll.options = req.body.options ? req.body.options : poll.options;
  poll.usersAnswer = [];
  // save the poll and check for errors
  poll.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New poll created!",
      data: poll
    });
  });
};

// Handle update user info
exports.update = function(req, res) {
  Poll.findById(req.body.poll_id, function(err, poll) {
    if (err) res.send(err);
    poll.ownerId = req.body.ownerId ? req.body.ownerId : poll.ownerId;
    poll.title = req.body.title ? req.body.title : poll.title;
    poll.description = req.body.description
      ? req.body.description
      : poll.description;
    poll.options = req.body.options ? req.body.options : poll.options;
    poll.usersAnswer = req.body.answer
      ? [...poll.usersAnswer, req.body.answer]
      : poll.usersAnswer;
    // save the user and check for errors
    poll.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Poll Info updated",
        data: poll
      });
    });
  });
};

// Handle view user info
exports.view = function(req, res) {
  Poll.findById(req.params.poll_id, function(err, poll) {
    if (err) res.send(err);
    res.json({
      message: "Poll details loading..",
      data: poll
    });
  });
};

// Handle delete user
exports.delete = function(req, res) {
  Poll.remove(
    {
      _id: req.params.poll_id
    },
    function(err, poll) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Poll deleted"
      });
    }
  );
};
