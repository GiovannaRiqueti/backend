// userController.js
// Import user model
User = require("../models/userModel");
// Handle index actions
exports.index = function(req, res) {
  User.get(function(err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users
    });
  });
};
// Handle create user actions
exports.new = function(req, res) {
  var user = new User();
  // Body is getting empty here
  user.name = req.body.name ? req.body.name : user.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.isAdmin = req.body.isAdmin;
  // save the user and check for errors
  user.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New user created!",
      data: user
    });
  });
};

exports.login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: password }, function(err, user) {
    if (!user) {
      res.json({
        userExists: false,
        message: "Wrong credentials",
        data: user
      });
    } else {
      res.json({
        userExists: true,
        message: "Its working",
        data: user
      });
    }
  });
};

// Handle view user info
exports.view = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);
    res.json({
      message: "User details loading..",
      data: user
    });
  });
};
// Handle update user info
exports.update = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.isAdmin = req.body.isAdmin;
    // save the user and check for errors
    user.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "User Info updated",
        data: user
      });
    });
  });
};
// Handle delete user
exports.delete = function(req, res) {
  User.remove(
    {
      _id: req.params.user_id
    },
    function(err, user) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "User deleted"
      });
    }
  );
};
