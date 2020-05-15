const userModel = require("../models/users");
module.exports = {
  getAuth: function(req, res, next) {
    userModel.findOne({ _id: req.user.id }, function(err, users) {
      if (err) {
        next(err);
      } else {
        const { password, ...userWithoutPassword } = users._doc;
        res.json({
          status: "success",
          message: "User found!!!",
          data: { user: userWithoutPassword }
        });
      }
    });
  }
};
