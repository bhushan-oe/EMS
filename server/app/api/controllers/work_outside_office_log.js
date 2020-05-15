const Work_Outside_Office_Log_Model = require("../models/work_outside_office_log");
module.exports = {
  create: function(req, res, next) {
    const {
      employee_id,
      date,
      time_from,
      time_to,
      task,
      manager_id,
      project_id,
      created_date = new Date(),
      created_by = req.user.userName,
      updated_date = new Date(),
      updated_by = req.user.userName,
      status = "Active"
    } = req.body;
    Work_Outside_Office_Log_Model.create(
      {
        employee_id,
        date,
        time_from,
        time_to,
        task,
        manager_id,
        project_id,
        created_date,
        created_by,
        updated_date,
        updated_by,
        status
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Work Outside Office Log added successfully!!!"
          });
      }
    );
  },
  getAll: function(req, res, next) {
    Work_Outside_Office_Log_Model.find({ _id: req.params.id }, function(
      err,
      users
    ) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Users list found!!!",
          data: users
        });
      }
    });
  }
};
