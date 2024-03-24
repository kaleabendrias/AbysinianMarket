const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const Accessories = require("../models/Accessories");
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

// Example implementation in your backend controller

exports.checkAdmin = async (req, res) => {
  try {
    // Get the JWT token from the cookie
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify and decode the token to extract user information
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming the token contains the user's email
    const userEmail = decodedToken.email;
    const user = await User.findOne({ email: userEmail });
    // If no user with that email exists
    if (user.role === "admin") {
      return res.status(200).send(true);
    } else {
      return res.status(200).send(false);
    }
  } catch (e) {
    console.error(`Unexpected Error: ${e}`);
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

exports.forgot = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user with the given email
    const user = await User.findOne({ email });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique verification token
    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Save the verification token and expiration time to the user document
    user.resetPasswordToken = verificationToken;
    user.resetPasswordExpires = Date.now() + 86400000; // Token expires in 1 day
    await user.save();

    // Send an email to the user containing a link with the verification token
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      // Example configuration for Gmail:
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
      subject: "Password Reset",
      html: `
        <p>Hello ${user.name},</p>
        <p>You have requested to reset your password. Please click the following link to reset your password:</p>
        <a href="http://localhost:5173/reset-password?token=${verificationToken}">Reset Password</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to send reset password email" });
      }
      console.log("Reset password email sent:", info.response);
      res
        .status(200)
        .json({ message: "Reset password instructions sent to your email" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePassword = async (req, res) => {
  const { verificationToken, password } = req.body;
  const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);
  const email = decoded.email;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);

    if (!decoded || !decoded.email || decoded.email !== user.email) {
      return res
        .status(401)
        .json({ message: "Invalid token or mismatched user" });
    }

    // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
      const type = req.body.type;
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
      } else if (type === "accessories") {
        const newAccessories = new Accessories({
          // ... property specific properties ...
          type,
          description,
          price,
          images,
        });
        await newAccessories.save();
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
