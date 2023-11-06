const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockTrackingSchema = new Schema({
 
  productType:{
    type:String,
    enum:{
        values:["roll","reel","carboard"],
        message:'{VALUE} IS NOT SUPPORTED'
    },
    required:[true,"Please provide transaction type"],
  },
  operation:{
    type:String,
    required:[true,"Operation is required"]
    
  },
  time: {
    type:Date,
    default: Date.now()
  },
  quantity:{
    type:Number,
    default:1
  }
});

module.exports = mongoose.model("StockTracking", StockTrackingSchema);
