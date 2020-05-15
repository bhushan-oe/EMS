const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  employee_id: {
    type: Number,
    trim: true,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  middlename: {
    type: String,
    trim: true,
    required: false
  },
  address1: {
    type: String,
    trim: true,
    required: true
  },
  address2: {
    type: String,
    trim: true,
    required: false
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  zip: {
    type: String,
    trim: true,
    required: true
  },
  state: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  gender: {
    type: String,
    trim: true,
    required: true
  },
  dateofbirth: {
    type: Date,
    trim: true,
    required: true
  },
  dateofjoining: {
    type: Date,
    trim: true,
    required: true
  },
  status: {
    type: String,
    trim: true,
    required: true
  },
  experience_at_joining: {
    type: Number,
    trim: true,
    required: true
  },
  work_location: {
    type: String,
    trim: true,
    required: true
  },
  timezone: {
    type: String,
    trim: true,
    required: true
  },
  shift_timing: {
    type: String,
    trim: true,
    required: false
  },
  designation: {
    type: String,
    trim: true,
    required: true
  },
  employment_status: {
    type: String,
    trim: true,
    required: true
  },
  userRole: {
    type: String,
    trim: true,
    required: true
  },
  reporting_manager: {
    type: String,
    trim: true,
    required: false
  },
  contact_no: {
    type: Number,
    trim: true,
    required: true
  },
  skills: {
    type: String,
    trim: true,
    required: true
  },
  certifications: {
    type: String,
    trim: true,
    required: false
  },
  achievements: {
    type: String,
    trim: true,
    required: false
  }
});
// hash user password before saving into database
UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("User", UserSchema);
