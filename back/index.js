const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const path = require("path");

const authRoutes = require("./routes/AuthRoutes");
const shopRoutes = require("./routes/ShopRoutes");
const buyRoutes = require("./routes/BuyRoutes");
const contactusRoutes = require("./routes/ContactusRoutes");

require("dotenv").config();

const app = express();

PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET, // Specify a secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "https://abysinianmarket.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          email: profile.emails[0].value,
        });
        const randomPassword = Math.random().toString(36).substring(7);

        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        if (!user) {
          user = await User.create({
            name: profile.displayName, // Set the username to the user's display name
            email: profile.emails[0].value,
            password: hashedPassword,
          });
        }
        done(null, user); // Pass the user to done callback
      } catch (err) {
        done(err); // Pass the error to done callback
      }
    }
  )
);

// Serialize user object to store in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user object from session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    // Successful authentication, redirect to a different page
    // Sign token and send it to user
    const user = req.user;
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete user.password; // Remove the password before sending it to user
    res.status(200).send({ token, ...user._doc });
    res.redirect("https://abysinian-market.vercel.app/protected");
  }
);

app.use("/api/auth", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/buy", buyRoutes);
app.use("/api/contactus", contactusRoutes);

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
