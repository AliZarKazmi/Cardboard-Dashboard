const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  materailName: {
    type: String,
    required: [true, "Please add a material name"],
    trim: true,
  },
  paperRate: { type: Number, required: true },
  rollRate: { type: Number, required: true },
  gamrige: { type: Number, required: true },
});

const MaterialModel = mongoose.model("materialsentities", MaterialSchema);
module.exports = MaterialModel;
