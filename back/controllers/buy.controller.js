require("dotenv").config();
const axios = require("axios");
const Clothing = require("../models/Clothing");

const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY;
exports.buy = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const tx_ref = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const currency = "ETB";
  const cloth = await Clothing.findById(id);
  amount = cloth.price;
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount,
      currency: currency,
      tx_ref: tx_ref,
      return_url: "http://localhost:5173/", // Set your return URL
    };
    let resp = "";
    await axios
      .post("https://api.chapa.co/v1/transaction/initialize", body, header)
      .then((response) => {
        resp = response;
        console.log(resp.data.data.checkout_url);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(400).json({
          message: error,
        });
      });
    res.status(200).json(resp.data);
  } catch (e) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
};
