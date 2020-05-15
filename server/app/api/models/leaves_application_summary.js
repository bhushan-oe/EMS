const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LeavesApplicationSummarySchema = new Schema({
  employee_id: {
    type: Number,
    trim: true,
    required: true,
    unique: true
  },
  type: {
    type: String,
    trim: true,
    required: true
  },
  count: {
    type: Number,
    trim: true,
    required: true
  },
  balance: {
    type: Number,
    trim: true,
    required: true
  },
  applied_on: {
    type: String,
    trim: true,
    required: true
  },
  note: {
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
  }
});

module.exports = mongoose.model(
  "Leaves_Application_Summary",
  LeavesApplicationSummarySchema
);
