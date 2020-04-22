

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LeavesApplicationSchema = new Schema({ 
    employee  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true,
      },
    functional_manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      trim: true,
      required: true
     },
    leave_date_from  : {
        type: Date,
        trim: true,
        required: true,        
      },
    leave_date_to  : {
        type: Date,
        trim: true,
        required: true,        
      },
    summary  : {
        type: String,
        trim: true,
        required: false,        
      },
    type  : {
        type: String,
        trim: true,
        required: true,        
      },
    status  : {
        type: String,
        trim: true,
        required: true,        
      },
    approved_by  : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      trim: true,
      required: true        
      },
    created_date  : {
        type: Date,
        trim: true,
        required: true,        
      },
    updated_date  : {
        type: Date,
        trim: true,
        required: true,        
      },
    created_by  : {
        type: String,
        trim: true,
        required: true,        
      },
    last_updated_by  : {
        type: String,
        trim: true,
        required: true,        
      },
});

module.exports = mongoose.model("Leaves_Application", LeavesApplicationSchema);