const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LeavesCreditSummarySchema = new Schema({
  employee_id: {
    type: Number,
    trim: true,
    required: true
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
  credited_on: {
    type: Date,
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
  "Leaves_Credit_Summary",
  LeavesCreditSummarySchema
);
