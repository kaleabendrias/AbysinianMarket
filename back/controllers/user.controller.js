const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const Property = require("../models/Property");
const Clothing = require("../models/Clothing");
const Vehicle = require("../models/Vehicle");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "password need to be atleast 6 chars" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    if (!user.approved) {
      return res.status(404).send({ message: "Email Not Verified!." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    // Create token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Return response with token
    res.cookie("jwt", token, { secure: false });
    res.status(200).send({ token, ...user._doc });
  } catch (err) {
    console.log(err);
    res.status(500).send("internal");
  }
};

exports.signup = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }
  //   Check if user already exists
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).send({ message: "Email is taken" });
  }
  //   Create new user
  const hashedPassword = bcrypt.hashSync(password, 10);
  user = new User({
    email,
    name,
    password: hashedPassword,
  });

  const verificationToken = jwt.sign(
    { email: user.email },
    process.env.VERIFY_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const verificationUrl = `http://localhost:5000/api/auth/verify?token=${verificationToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Verify your email",
    text: `Please click this link to verify your email: ${verificationUrl}`,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
  console.log("email sent");

  try {
    await user.save();
    user = user.toObject(); // Convert user document to plain JavaScript object
    delete user.password;
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ auth: false, message: "No Token Provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).send({ auth: true, user: decoded.user });
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
};

exports.verify = (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.status(400).send({ message: "Verification token missing" });
  }
  jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Invalid or expired verification token." });
    }
    const { email } = decoded;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      // Update user's verification status to true
      user.approved = true;
      await user.save();

      return res.redirect("http://localhost:5173/signin");
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.clearCookie("jwt");
    res.status(200).send("sucess");
  });
};

const upload = multer({ dest: "uploads/" });

exports.sell = async (req, res) => {
  try {
    // Use multer middleware to parse form data (including images)
    await upload.array("images")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading images." });
      }

      // Access form data (text fields) from req.body
      const type = "clothing";
      const description = req.body.description; // Corrected typo
      const price = req.body.price;
      const size = req.body.size;
      const color = req.body.color;

      // Access uploaded images from req.files (array)
      const images = req.files.map((file) => file.filename); // Assuming filenames are stored

      // ... save data based on type using your models ...

      if (type === "vehicle") {
        const newVehicle = new Vehicle({
          // ... vehicle specific properties ...
          description,
          price,
          size,
          color,
          images,
        });
        await newVehicle.save();
      } else if (type === "property") {
        const newProperty = new Property({
          // ... property specific properties ...
          description,
          price,
          size,
          images,
        });
        await newProperty.save();
      } else if (type === "clothing") {
        const newClothing = new Clothing({
          type,
          description,
          price,
          color,
          size,
          images,
        });
        await newClothing.save();
      }
      // ... handle other types ...

      res.status(201).json({ message: "Item created successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
