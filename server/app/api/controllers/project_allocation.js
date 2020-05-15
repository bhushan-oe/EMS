const Project_Allocation_Model = require("../models/project_allocation");

module.exports = {
  create: function(req, res, next) {
    const {
      project,
      employee,
      startdate,
      enddate,
      functional_manager,
      created_date = new Date(),
      updated_date = new Date(),
      created_by = req.user.userName,
      last_updated_by = req.user.userName,
      status = "Active"
    } = req.body;
    Project_Allocation_Model.create(
      {
        project,
        employee,
        startdate,
        enddate,
        functional_manager,
        created_date,
        updated_date,
        created_by,
        last_updated_by,
        status
      },
      function(err) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: " Project Allocated Successfully!!!"
          });
      }
    );
  },

  // Get all project allocation info using employee or project as query params
  getAll: function(req, res, next) {
    const status = "Active";
    const employee = req.query.employee;
    const project = req.query.project;
    const query = employee
      ? { employee, status }
      : project
      ? { project, status }
      : { status };
    Project_Allocation_Model.find(query, null, { sort: { enddate: -1 } })
      .populate("project", "title")
      .populate("employee", "firstname lastname")
      .populate("functional_manager", "firstname lastname")
      .exec(function(err, projectAllocations) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Project Allocation list found!!! ",
            data: projectAllocations
          });
        }
      });
  },

  update: function(req, res, next) {
    Project_Allocation_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
        updated_date: new Date(),
        last_updated_by: req.user.userName
      },
      function(err) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Deallocated Employee successfully!!!"
          });
        }
      }
    );
  },

  delete: function(req, res, next) {
    Project_Allocation_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "Inactive",
        updated_date: new Date(),
        last_updated_by: req.user.userName
      },
      function(err) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Project Allocation Info deleted successfully!!!"
          });
        }
      }
    );
  }
};
