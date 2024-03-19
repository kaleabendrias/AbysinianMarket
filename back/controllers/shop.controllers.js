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
exports.getOneClothe = async (req, res) => {
  const id = req.params.id;
};
