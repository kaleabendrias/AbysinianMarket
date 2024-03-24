const mongoose = require("mongoose");

const contactusSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contactus", contactusSchema);
