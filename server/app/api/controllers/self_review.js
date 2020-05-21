const Self_Review_Model = require("../models/self_review");
const userModel = require("../models/users");
const Project_Allocation_Model = require("../models/project_allocation");
module.exports = {
  create: function(req, res, next) {
    const {
      employee: allEmployee,
      from_date,
      to_date,
      due_from,
      due_to,
      feedback,
      review_form_link,
      status = "Active",
      created_date = new Date(),
      updated_date = new Date(),
      created_by = req.user.userName,
      last_updated_by = req.user.userName
    } = req.body;

    let count = 0;
    const finalData = allEmployee.map(async (user, index) => {
      let projectIds;
      await Project_Allocation_Model.find({
        $and: [
          {
            $or: [
              {
                $and: [
                  { startdate: { $lte: from_date } },
                  { enddate: { $lte: to_date } },
                  { enddate: { $gt: from_date } }
                ]
              },
              {
                $and: [
                  { startdate: { $lte: from_date } },
                  { enddate: { $gte: to_date } }
                ]
              },
              {
                $and: [
                  { startdate: { $gt: from_date } },
                  { startdate: { $lt: to_date } },
                  { enddate: { $gte: to_date } }
                ]
              },
              {
                $and: [
                  { startdate: { $gte: from_date } },
                  { startdate: { $lt: to_date } },
                  { enddate: { $lte: to_date } },
                  { enddate: { $gt: from_date } }
                ]
              }
            ]
          },
          { employee: user }
        ]
      })
        .then(item => {
          let projectIdsArray = [];
          if (item.length > 0) {
            for (let x in item) {
              const obj = {
                projects: item[x].project,
                functional_manager: item[x].functional_manager
              };
              projectIdsArray.push(obj);
            }
            projectIds = projectIdsArray;
          } else {
            let projects = null,
              functional_manager = null;
            projectIdsArray.push({
              projects,
              functional_manager
            });
            projectIds = projectIdsArray;
          }

          const employee = user,
            projects = projectIds;
          Self_Review_Model.create(
            {
              employee,
              projects,
              from_date,
              to_date,
              due_from,
              due_to,
              feedback,
              review_form_link,
              status,
              created_date,
              updated_date,
              created_by,
              last_updated_by
            },
            function(err) {
              if (err) next(err);
              else {
                count++;
                if (allEmployee.length == count) {
                  res.json({
                    status: "success",
                    message:
                      "Self reviews has been created for all employees !!!"
                  });
                }
              }
            }
          );
        })
        .catch(err => console.log(err));
    });
  },

  update: function(req, res, next) {
    delete req.body.created_date;
    delete req.body.created_by;

    const today = new Date();

    Self_Review_Model.findOne({ _id: req.params.id }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo.due_from <= today && userInfo.due_to >= today) {
          Self_Review_Model.findOneAndUpdate(
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
                  message: "Review updated successfully!!!"
                });
              }
            }
          );
        } else {
          res.json({
            status: "error",
            message:
              "Review can be updated withing due dates only, for Active users!"
          });
        }
      }
    });
  },

  getAll: function(req, res, next) {
    const { status } = req.query;
    Self_Review_Model.find(status ? { status: status } : {})
      .populate("projects.projects", "title")
      .populate("employee", "firstname lastname")
      .populate("projects.functional_manager", "firstname lastname")
      .exec(function(err, reviews) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Review list ",
            data: reviews
          });
        }
      });
  },
  getForUser: function(req, res, next) {
    const { status } = req.query;
    Self_Review_Model.find(
      status
        ? { employee: req.params.employee_id, status: status }
        : { employee: req.params.employee_id }
    )
      .populate("projects", "title")
      .populate("employee", "firstname lastname")
      .populate("functional_manager", "firstname lastname")
      .exec(function(err, reviews) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Self Review list found!!!",
            data: reviews
          });
        }
      });
  },
  getForManager: function(req, res, next) {
    const { functional_manager, selectedYear, value, status } = req.query;
    let startDate, endDate;
    switch (value) {
      case "Quarter 1":
        startDate = new Date(`${selectedYear}-01-01T05:30`);
        endDate = new Date(`${selectedYear}-03-31T23:59`);
        break;
      case "Quarter 2":
        startDate = new Date(`${selectedYear}-04-01T05:30`);
        endDate = new Date(`${selectedYear}-06-30T23:59`);
        break;
      case "Quarter 3":
        startDate = new Date(`${selectedYear}-07-01T05:30`);
        endDate = new Date(`${selectedYear}-09-30T23:59`);
        break;
      case "Quarter 4":
        startDate = new Date(`${selectedYear}-10-01T05:30`);
        endDate = new Date(`${selectedYear}-12-31T23:59`);
        break;
      default:
        startDate = "";
        endDate = "";
        break;
    }
    Self_Review_Model.find({
      functional_manager: functional_manager,
      from_date: { $gte: startDate },
      to_date: { $lte: endDate },
      status: status
    })
      .populate("projects", "title")
      .populate("employee", "firstname lastname")
      .populate("functional_manager", "firstname lastname")
      .exec(function(err, reviews) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Peer Review list found!!!",
            data: reviews
          });
        }
      });
  },

  delete: function(req, res, next) {
    Self_Review_Model.findOneAndUpdate(
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
            message: "Review deleted successfully!!!"
          });
        }
      }
    );
  }
};
