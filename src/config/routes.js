const express = require("express");
var userController = require("../controllers/userController");
var pollController = require("../controllers/pollController");
var answerController = require("../controllers/answerController");

module.exports = function(server) {
  //API routers
  const router = express.Router();

  router.get("/", function(req, res) {
    res.json({
      status: "API Its Working",
      message: "Welcome to RESTHub crafted with love!"
    });
  });

  router
    .route("/users")
    .get(userController.index)
    .post(userController.new)
    .delete(userController.delete);

  router.route("/signin").post(userController.login);

  router
    .route("/poll")
    .get(pollController.index)
    .post(pollController.new)
    .put(pollController.update);

  router.route("/poll/:poll_id").delete(pollController.delete);

  router
    .route("/answer")
    .get(answerController.index)
    .post(answerController.new)
    .put(answerController.update);

  router
    .route("/users/:user_id")
    .get(userController.view)
    .delete(userController.delete);

  server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  server.use("/api", router);
};
