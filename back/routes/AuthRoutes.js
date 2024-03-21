const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authController = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signin", authController.signin);

router.post("/signup", authController.signup);

router.get("/checkauth", authController.checkAuth);

router.get("/checkadmin", authController.checkAdmin);

router.get("/verify", authController.verify);

router.get("/logout", authController.logout);

router.post("/sell", authController.sell);

router.post("/forgot", authController.forgot);

router.post("/updatePassword", authController.updatePassword);

module.exports = router;
