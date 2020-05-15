const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkOutsideOfficeLogSchema = new Schema({
  employee_id: {
    type: Number,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    trim: true,
    required: true
  },
  time_from: {
    type: String,
    trim: true,
    required: true
  },
  time_to: {
    type: String,
    trim: true,
    required: true
  },
  task: {
    type: String,
    trim: true,
    required: true
  },
  manager_id: {
    type: Number,
    trim: true,
    required: true
  },
  project_id: {
    type: String,
    trim: true,
    required: true
  },
  created_date: {
    type: Date,
    trim: true,
    required: true
  },
  created_by: {
    type: String,
    trim: true,
    required: true
  },
  updated_date: {
    type: Date,
    trim: true,
    required: true
  },
  updated_by: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model(
  "Work_Outside_Office_Log",
  WorkOutsideOfficeLogSchema
);
