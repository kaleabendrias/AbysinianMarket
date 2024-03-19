const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controllers");

router.get("/cloths", shopController.cloths);

module.exports = router;
