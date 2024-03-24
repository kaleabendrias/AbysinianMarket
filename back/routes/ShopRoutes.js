const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controllers");

router.get("/cloths", shopController.cloths);
router.get("/accessories", shopController.accessories);
router.get("/cloth/:id", shopController.cloth);
router.get("/accessories/:id", shopController.accessory);

module.exports = router;
