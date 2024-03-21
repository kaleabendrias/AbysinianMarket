const mongoose = require("mongoose");

const accessoriesSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: true,
  },
  property_type: {
    type: String,
    required: false,
  },
  area: {
    type: Number,
    required: false,
  },
  // ... You can add other property-specific fields here
});

module.exports = mongoose.model("Accessory", accessoriesSchema);
