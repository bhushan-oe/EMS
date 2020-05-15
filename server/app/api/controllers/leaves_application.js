const Leaves_Application_Model = require("../models/leaves_application");
module.exports = {
  create: function(req, res, next) {
    const {
      employee,
      functional_manager,
      leave_date_from,
      leave_date_to,
      summary,
      type,
      status = "Active",
      approved_by = null,
      created_date = new Date(),
      updated_date = new Date(),
      created_by = req.user.userName,
      last_updated_by = req.user.userName
    } = req.body;
    Leaves_Application_Model.create(
      {
        employee,
        functional_manager,
        leave_date_from,
        leave_date_to,
        summary,
        type,
        status,
        approved_by,
        created_date,
        updated_date,
        created_by,
        last_updated_by
      },
      function(err) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Leave Application added successfully!!!"
          });
      }
    );
  },
  getAll: function(req, res, next) {
    Leaves_Application_Model.find()
      .populate("employee", "firstname lastname")
      .populate("functional_manager", "firstname lastname")
      .populate("approved_by", "firstname lastname")
      .exec(function(err, users) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Leave Details found!!!",
            data: users
          });
        }
      });
  },

  getLeaveInfo: function(req, res, next) {
    Leaves_Application_Model.findOne({ _id: req.params.id })
      .populate("employee", "firstname lastname")
      .populate("functional_manager", "firstname lastname")
      .populate("approved_by", "firstname lastname")
      .exec(function(err, leaves) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Employee Leave Information found!!!",
            data: leaves
          });
        }
      });
  },

  //Update status to canceled OR approved by field.
  update: function(req, res, next) {
    Leaves_Application_Model.findOneAndUpdate(
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
            message: "Updated Leave Information successfully!!!"
          });
        }
      }
    );
  },

  delete: function(req, res, next) {
    Leaves_Application_Model.findOneAndUpdate(
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
            message: "Leave Information deleted successfully!!!"
          });
        }
      }
    );
  }
};
