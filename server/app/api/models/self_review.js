
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SelfReviewSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    required: true,
  },
  projects: {
    type: [{
     projects : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      },
 functional_manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
    }],
    trim: true,
    required: true,
  },
  from_date: {
    type: Date,
    trim: true,
    required: true,
  },
  to_date: {
    type: Date,
    trim: true,
    required: true,
  },
  due_from: {
    type: Date,
    trim: true,
    required: true,
  },
  due_to: {
    type: Date,
    trim: true,
    required: true,
  },
  review_form_link: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  feedback: {
    type: String,
    trim: true,
    required: false,
  },
  created_date: {
    type: Date,
    trim: true,
    required: true,
  },
  updated_date: {
    type: Date,
    trim: true,
    required: true,
  },
  created_by: {
    type: String,
    trim: true,
    required: true,
  },
  last_updated_by: {
    type: String,
    trim: true,
    required: true,
  },
});

//todo add condition for rview submission

// SelfReviewSchema.index({
//     employee_id: 1,
//     // updated_date:1,
//     // updated_date: { $gte:SelfReviewSchema.from_date, $lte:SelfReviewSchema.to_date}}, {
//     unique: true,
//   });


module.exports = mongoose.model("Self_Review", SelfReviewSchema);