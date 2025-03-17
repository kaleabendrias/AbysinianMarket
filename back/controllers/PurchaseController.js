// controllers/purchaseController.js
const Purchase = require("../models/Purchase");

exports.savePurchase = async (req, res) => {
  const { userId, items, totalAmount, location, tx_ref } = req.body;

  try {
    const purchase = new Purchase({
      userId,
      items,
      totalAmount,
      location: {
        type: "Point",
        coordinates: location, // [longitude, latitude]
      },
      tx_ref,
    });

    await purchase.save();
    res.status(201).json({ message: "Purchase saved successfully", purchase });
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).json({ message: "Failed to save purchase", error });
  }
};

// Fetch all purchases
exports.getAllPurchases = async (req, res) => {
    try {
      const purchases = await Purchase.find()
        .populate("userId", "name email") // Populate user details (if needed)
        .sort({ createdAt: -1 }); // Sort by most recent purchases
  
      res.status(200).json(purchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      res.status(500).json({ message: "Failed to fetch purchases", error });
    }
  };