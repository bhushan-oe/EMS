const Self_Review_Model = require("../models/self_review");
module.exports = {
  create: function (req, res, next) {
    const { employee,
      projects,
      from_date,
      to_date,
      due_from,
      due_to,
      feedback,
      functional_manager,
      review_form_link,
      status = 'Active',
      created_date = new Date(),
      updated_date = new Date(),
      created_by = req.user.userName,
      last_updated_by = req.user.userName } = req.body;
    Self_Review_Model.create(
      {
        employee,
        projects,
        from_date,
        to_date,
        due_from,
        due_to,
        feedback,
        functional_manager,
        review_form_link,
        status,
        created_date,
        updated_date,
        created_by,
        last_updated_by
      },
      function (err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Review added successfully!!!"
          });
      }
    );
  },


  update: function (req, res, next) {
    delete req.body.created_date;
    delete req.body.created_by;

    const today = new Date();

    Self_Review_Model.findOne({ _id: req.params.id }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo.due_from <= today && userInfo.due_to >= today && userInfo.status == 'Active') {
          Self_Review_Model.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: req.body,
              updated_date: new Date(),
              last_updated_by: req.user.userName
            },
            function (err, info) {
              if (err) {
                console.log("in err", err);
                next(err);
              } else {
                res.json({
                  status: "success",
                  message: "Review updated successfully!!!"
                });
              }
            }
          );
        }
        else {
          res.json({
            status: "error",
            message: "Review can be updated withing due dates only, for Active users!"
          });
        }
      }
    });
  },

  getAll: function (req, res, next) {
    const { status } = req.query
    Self_Review_Model.find(status ? { status: status } : {})
      .populate('projects', 'title')
      .populate('employee', 'firstname lastname')
      .populate('functional_manager', 'firstname lastname')
      .exec(function (err, reviews) {
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
  getForUser: function (req, res, next) {
    const { status } = req.query
    Self_Review_Model.find(status ? { employee: req.params.employee_id, status: status } : { employee: req.params.employee_id }).populate('projects', 'title')
      .populate('employee', 'firstname lastname')
      .populate('functional_manager', 'firstname lastname')
      .exec(function (err, reviews) {
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

  delete: function (req, res, next) {
    Self_Review_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "Inactive"
      },
      function (err, userInfo) {
        if (err) {
          console.log("in err");
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