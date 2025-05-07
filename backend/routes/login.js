const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const loginValidation = require('../validation/login');
const generateToken = require('../utils/generateToken');



Router.post('/login', async (req, res) => {
  try {
    console.log("1: Login body", req.body); // Check if body exists

    const { error } = loginValidation.validate(req.body);
    if (error) {
      console.log("2: Validation error");
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("3: User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("4: Password mismatch");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    console.log("5: Token generated");

    return res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login route error:", err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
});
module.exports = Router;