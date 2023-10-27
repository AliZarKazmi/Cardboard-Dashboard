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
                required: true,
                trim: true,
              },
              vendorName: {
                type: String,
                required: true,
                trim: true,
                default: "Ali",
              },
              Rate: {
                type: Number,
                required: true,
              }
            },
          ],
        },
      },
    ],
  }
});

module.exports = mongoose.model("Reel", ReelSchema);
