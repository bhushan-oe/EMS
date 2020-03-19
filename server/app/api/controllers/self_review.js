const Self_Review_Model = require("../models/self_review");
module.exports = {
  create: function(req, res, next) {
    Self_Review_Model.create(
      {
        employee_id: req.body.employee_id,        
        project_ids: req.body.project_ids,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        due_from: req.body.due_from,
        due_to: req.body.due_to,
        feedback : req.body.feedback,
        review_form_link: req.body.review_form_link,
        status: "Active",
        created_date: new Date(),
        updated_date: new Date(),
        created_by: req.user.userName,
        last_updated_by: req.user.userName
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Review added successfully!!!"
          });
      }
    );
  },


  update: function(req, res, next) {    
    delete req.body.created_date;
    delete req.body.created_by;
      
    const today =new Date();

      Self_Review_Model.findOne({ _id: req.params.id }, function(err, userInfo) {        
        if (err) {
          next(err);
        } else {          
          if(userInfo.due_from <=today && userInfo.due_to >= today && userInfo.status == 'Active')
      {        
        Self_Review_Model.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: req.body,
            updated_date: new Date(),
            last_updated_by: req.user.userName
          },
          function(err, info) {
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
      else
      {
        res.json({
          status: "error",
          message: "Review can be updated withing due dates only, for Active users!" 
        });
      }
        }
      });
  },

  getAll: function(req, res, next) {
    Self_Review_Model.find({}, function(err, reviews) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Review list found!!!",
          data: reviews
        });
      }
    });
  },
  getForUser: function(req, res, next) {
        Self_Review_Model.find({employee_id: req.params.employee_id , status : 'Active' },  function(
      err,
      users
    ) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Self Review list found!!!",
          data: users
        });
      }
    });
  },
 
  delete: function(req, res, next) {
    Self_Review_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "Inactive"
      },
      function(err, userInfo) {
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