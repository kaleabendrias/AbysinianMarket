const express = require("express");
const router = express.Router();
const buyController = require("../controllers/buy.controller");

router.post("/", buyController.buy);

module.exports = router;
