// routes/purchaseRoutes.js
const express = require("express");
const purchaseController = require("../controllers/PurchaseController");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to save purchase details
router.post(
  "/purchase",
  authenticateToken,
  authorizeRoles(["admin"]),
  purchaseController.savePurchase
);
router.get("/purchases", purchaseController.getAllPurchases);

module.exports = router;
