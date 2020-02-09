const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true //todo unique validations are not working
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  userRole: {
    type: String,
    trim: true,
    required: true
  }
});
// hash user password before saving into database
UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("User", UserSchema);
