const Accessories = require("../models/Accessories");
const Clothing = require("../models/Clothing");

exports.cloths = async (req, res) => {
  try {
    let clothes = await Clothing.find()
      .sort({ createdAt: -1 }) //Sort by date in descending order
      .lean();

    res.status(200).json(clothes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting clothing data" });
  }
};

//Get a single piece of clothing information
exports.cloth = async (req, res) => {
  const id = req.params.id;
  try {
    let cloth = await Clothing.findById(id);
    if (!cloth) {
      return res.status(404).json({ message: "No such clothing exists!" });
    }

    res.status(200).json(cloth);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
};

exports.accessories = async (req, res) => {
  try {
    let accessories = await Accessories.find()
      .sort({ createdAt: -1 }) //Sort by date in descending order
      .lean();

    console.log(accessories);

    res.status(200).json(accessories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting accessories data" });
  }
};

exports.accessory = async (req, res) => {
  const id = req.params.id;
  try {
    let accessory = await Accessories.findById(id);
    if (!accessory) {
      return res.status(404).json({ message: "No such accessory exists!" });
    }

    res.status(200).json(accessory);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
};
