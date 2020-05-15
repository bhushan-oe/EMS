const Leaves_Credit_Summary_Model = require("../models/leaves_credit_summary");
module.exports = {
  // create: function(req, res, next) {
  //   Leaves_Credit_Summary_Model.create(
  //     {
  //         employee_id : req.body.employee_id,
  //         type : req.body.type,
  //         count : req.body.count,
  //         credited_on : req.body.credited_on,
  //         note : req.body.note,
  //         created_date : req.body.created_date,
  //         created_by : req.body.created_by,
  //         updated_date : req.body.updated_date,
  //         updated_by : req.body.updated_by,
  //     },
  //     function(err, result) {
  //       if (err) next(err);
  //       else
  //         res.json({
  //           status: "success",
  //           message: "Leaves Credit Summary added successfully!!!",
  //         });
  //     }
  //   );
  // },
  // getAll: function(req, res, next) {
  //   Leaves_Credit_Summary_Model.find({}, function(err, users) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       res.json({
  //         status: "success",
  //         message: "Users list found!!!",
  //         data: users
  //       });
  //     }
  //   });
  // }
};
