const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PeerReviewSchema = new Schema({
  employee_under_review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
    required: true
  },
  employee_reviewing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    trim: true,
    required: true
  },
  functional_manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
    required: true
  },
  from_date: {
    type: Date,
    trim: true,
    required: true
  },
  to_date: {
    type: Date,
    trim: true,
    required: true
  },
  due_from: {
    type: Date,
    trim: true,
    required: true
  },
  due_to: {
    type: Date,
    trim: true,
    required: true
  },
  review_form_link: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
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
  }
});

module.exports = mongoose.model("Peer_Review", PeerReviewSchema);
