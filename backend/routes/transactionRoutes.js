// routes/transactionRoutes.js

const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new transaction
router.post("/", async (req, res) => {
  const { amount, category, type } = req.body;
  if (!amount || !category || !type) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const newTransaction = new Transaction({ amount, category, type });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
