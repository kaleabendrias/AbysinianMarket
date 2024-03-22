const express = require("express");
const contactusController = require("../controllers/contactus.controller");

const router = express.Router();

router.post("/", contactusController.contactus);

module.exports = router;
