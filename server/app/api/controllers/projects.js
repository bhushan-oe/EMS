const projectModel = require("../models/projects");

module.exports = {
  create: function(req, res, next) {
    const {
          title ,
          description,
          startdate,
          enddate,
          technology,
          client,
          client_location,
          status = "Active",
          type,
          created_date = new Date(),
          created_by = req.user.userName,
          updated_date = new Date(),
          last_updated_by = req.user.userName,
    } = req.body;
    projectModel.create(
      {          
         title ,
          description,
          startdate,
          enddate,
          technology,
          client,
          client_location,
          status,
          type,
          created_date,
          created_by,
          updated_date,
          last_updated_by,
      },
      function(err) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Project added successfully!!!",            
          });
      }
    );
  },
  getProject: function(req, res, next) {    
    //todo - remove or optimize it
    projectModel.findOne({ _id: req.params.id }, function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Project found!!!",
          data: users
        });
      }
    });
  },
  getAll: function(req, res, next) { 
    const {status} = req.query;  
    projectModel.find(status ? {status} : {}, function(err, projects) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Project list found!!!",
          data: projects
        });
      }
    });
  },
  update: function(req, res, next) { 
    projectModel.findOneAndUpdate({ _id: req.params.id }, 
      {
          $set: req.body,
          updated_date : new Date(),
          last_updated_by : req.user.userName,
      },      
      function(err) {      
      if (err) {
        next(err);
      }      
      else {
              res.json({
                status: "success",
                message: "Project updated successfully!!!",                
              });
            }
        });
  },

  delete: function(req, res, next) {
    projectModel.findOneAndUpdate({ _id: req.params.id }, 
      {
         status : "Inactive",
        updated_date : new Date(),
        last_updated_by : req.user.userName
      },      
      function(err) {      
      if (err) {
        next(err);
      }      
      else {
              res.json({
                status: "success",
                message: "Project deleted successfully!!!",                
              });
            }
        });
  }
};
