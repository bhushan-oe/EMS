const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectAllocationSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    trim: true,
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
    required: true
  },
  startdate: {
    type: Date,
    trim: true,
    required: true
  },
  enddate: {
    type: Date,
    trim: true,
    required: false
  },
  functional_manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
    required: true
  },
  created_date: {
    type: Date,
    trim: true,
    required: true
  },
  updated_date: {
    type: Date,
    trim: true,
    required: true
  },
  created_by: {
    type: String,
    trim: true,
    required: true
  },
  last_updated_by: {
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

module.exports = mongoose.model("Project_Allocation", ProjectAllocationSchema);
