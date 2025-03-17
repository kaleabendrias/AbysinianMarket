// controllers/buyController.js
require("dotenv").config();
const axios = require("axios");
const Clothing = require("../models/Clothing");
const Accessories = require("../models/Accessories");
const Purchase = require("../models/Purchase");

const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY;

exports.buy = async (req, res) => {
  const { items, userId, location } = req.body; // Expect an array of items, userId, and location
  console.log("Items to purchase:", items);

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid items data" });
  }

  let totalAmount = 0;
  const tx_ref = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const currency = "ETB";

  try {
    // Calculate the total amount for all items
    const purchaseItems = [];
    for (const item of items) {
      const { id, type } = item;

      if (type === "clothing") {
        const clothingItem = await Clothing.findById(id);
        if (!clothingItem) {
          return res.status(404).json({ message: `Clothing item not found: ${id}` });
        }
        totalAmount += clothingItem.price;
        purchaseItems.push({
          itemId: clothingItem._id,
          type: "clothing",
          price: clothingItem.price,
        });
      } else if (type === "accessories") {
        const accessoryItem = await Accessories.findById(id);
        if (!accessoryItem) {
          return res.status(404).json({ message: `Accessory item not found: ${id}` });
        }
        totalAmount += accessoryItem.price;
        purchaseItems.push({
          itemId: accessoryItem._id,
          type: "accessory",
          price: accessoryItem.price,
        });
      } else {
        return res.status(400).json({ message: `Invalid item type: ${type}` });
      }
    }

    // Initialize payment with the total amount
    const header = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const body = {
      amount: totalAmount,
      currency: currency,
      tx_ref: tx_ref,
      return_url: "https://abysinian-market.vercel.app/", // Set your return URL
    };

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      header
    );

    console.log("Payment initialized:", response.data.data.checkout_url);

    // Save purchase details to the database
    const purchase = new Purchase({
      userId,
      items: purchaseItems,
      totalAmount,
      location: {
        type: "Point",
        coordinates: location, // [longitude, latitude]
      },
      tx_ref,
    });

    await purchase.save();
    console.log("Purchase saved successfully:", purchase);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error during payment initialization:", error);
    res.status(500).json({
      message: "Failed to initialize payment",
      error: error.response ? error.response.data : error.message,
    });
  }
};