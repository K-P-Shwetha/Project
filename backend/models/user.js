const mongoose = require("mongoose");

// Best practice: define schema with more control & validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // adds createdAt and updatedAt

const User = mongoose.model("User", userSchema);

module.exports = User;
