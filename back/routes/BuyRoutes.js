const express = require("express");
const router = express.Router();
const buyController = require("../controllers/buy.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, buyController.buy);

module.exports = router;
