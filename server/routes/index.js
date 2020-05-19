const projects = require("./projects");
const projectAllocation = require("./project_allocation");
const users = require("./users");
const authorization = require("./authorization");
const peersReview = require("./peer_review");
const validateUser = require("../middleware/validate-user");
const review = require("./self_review");
const leaves = require("./leaves_application");
module.exports = app => {
  // public route
  app.use("/users", users);

  // private route
  app.use("/projects", projects);
  app.use("/authorization", authorization);
  app.use("/allocateProject", projectAllocation);
  app.use("/peersReview", peersReview);
  app.use("/review", review);
  app.use("/leaves", leaves);
  //app.use(logger('dev'));
  app.get("/", function(req, res) {
    res.json({
      message: "Hello world! keep smilling"
    });
    res.send();
  });

  // express doesn't consider not found 404 as an error so we need to handle 404 explicitly
  // handle 404 error
  app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
};
