const Contactus = require("../models/Contactus");

exports.contactus = async (req, res) => {
  const { email, subject, feedback } = req.body;
  if (!email || !subject || !feedback) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const newContact = await Contactus.create({ email, subject, feedback });
    res.status(201).json({
      message: "Contact information saved successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error while saving contact information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
