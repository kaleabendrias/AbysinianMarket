const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Clothing", clothingSchema);
