const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReelSchema = new Schema({
  Type: {
    type: String,
    required: true,
    trim: true,
  },
  
  Sizes: {
    type: [
      {
        Size: {
          type: Number,
          required: true,
        },
        Weight: {
          type: [
            {
              weight_type: {
                type: Number,
                required: true
              },
              vendorName: {
                type: String,
                required: true,
                trim: true,
              },
              Rate: {
                type: Number,
                required: true,
              },
              imgPath:{
                type:String,
                required: true,
                trim: true,

              }
            },
          ],
        },
      },
    ],
  }
});

module.exports = mongoose.model("Reel", ReelSchema);
