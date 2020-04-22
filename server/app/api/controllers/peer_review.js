const Peer_Review_Model = require("../models/peer_review");
const emailProvider = require("../../service/ses_client");
const emails = require('../../emailTemplates/peerReviewTemplate')

module.exports = {
  create: function (req, res, next) {
    req.body.employee_reviewing.map((employee_reviewing) => {
      Peer_Review_Model.create(
        {
          employee_under_review: req.body.employee_under_review,
          employee_reviewing: employee_reviewing,
          project: req.body.project,
          functional_manager: req.body.functional_manager,
          from_date: req.body.from_date,
          to_date: req.body.to_date,
          due_from: req.body.due_from,
          due_to: req.body.due_to,
          review_form_link: req.body.review_form_link,
          status: "Active",
          created_date: new Date(),
          updated_date: new Date(),
          created_by: req.user.userName,
          last_updated_by: req.user.userName
        },
        function (err) {
          if (err) next(err);
          else{
             const peerName ="surekha.test.email";
             const to = "surekha.gadkari@objectedge.com";
            //IN PROGRESS -   const from = "surekha.gadkari@objectedge.com";
            const from= null;
             const subject = 'Peer Review';
             emailProvider.sendEmail(to,from, subject, emails.peerReviewEmailTemplate(peerName))
             res.json({
              status: "success",
              message: " Peer Review added successfully!!!"
            });         
            }
        }
      );
    })
  },

  update: function (req, res, next) {
    delete req.body.created_date;
    delete req.body.created_by;
    Peer_Review_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
        updated_date: new Date(),
        last_updated_by: req.user.userName
      },
      function (err) {
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
  },
  getAll: function (req, res, next) {
    const { status } = req.query
    Peer_Review_Model.find(status ? { status: status } : {})
      .populate('employee_under_review', 'firstname lastname')
      .populate('employee_reviewing', 'firstname lastname')
      .populate('project', 'title')
      .populate('functional_manager', 'firstname lastname')
      .exec(function (err, reviews) {
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
  getForUser: function (req, res, next) {
    const { status } = req.query
    Peer_Review_Model
      .find(status ? { employee_reviewing: req.params.employee_id, status: status } : { employee_reviewing: req.params.employee_id })
      .populate('employee_under_review', 'firstname lastname')
      .populate('employee_reviewing', 'firstname lastname')
      .populate('project', 'title')
      .populate('functional_manager', 'firstname lastname')
      .exec(function (err, reviews) {
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
  getForManager: function (req, res, next) {
    const { functional_manager, selectedYear, value } = req.query
    let startDate, endDate
    switch (value) {
      case 'Quarter 1':
        startDate = new Date(`${selectedYear}-01-01T23:59`);
        endDate = new Date(`${selectedYear}-03-31T23:59`)
        break;
      case 'Quarter 2':
        startDate = new Date(`${selectedYear}-04-01T23:59`);
        endDate = new Date(`${selectedYear}-06-30T23:59`)
        break;
      case 'Quarter 3':
        startDate = new Date(`${selectedYear}-07-01T23:59`);
        endDate = new Date(`${selectedYear}-09-30T23:59`)
        break;
      case 'Quarter 4':
        startDate = new Date(`${selectedYear}-10-01T23:59`);
        endDate = new Date(`${selectedYear}-12-31T23:59`)
        break;
      default:
        startDate = '';
        endDate = ''
        break;
    }
    Peer_Review_Model
      .find({
        functional_manager: functional_manager,
        from_date: { $gte: startDate },
        to_date: { $lte: endDate },
        status: "Done"
      })
      .populate('employee_under_review', 'firstname lastname')
      .populate('employee_reviewing', 'firstname lastname')
      .populate('project', 'title')
      .populate('functional_manager', 'firstname lastname')
      .exec(function (err, reviews) {
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
  delete: function (req, res, next) {
    Peer_Review_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "Inactive",
        updated_date : new Date(),
        last_updated_by : req.user.userName,
      },
      function (err) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Project deleted successfully!!!"
          });
        }
      }
    );
  }
};
