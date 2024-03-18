const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
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
    required: true,
  },
  property_type: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
  },
  // ... You can add other property-specific fields here
});

module.exports = mongoose.model("Property", propertySchema);
