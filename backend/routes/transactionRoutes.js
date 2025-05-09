// routes/transactionRoutes.js

const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const authmidware = require("../middlewares/auth");
// GET all transactions
router.get("/",authmidware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new transaction
router.post("/", authmidware,async (req, res) => {
  const { amount, category, type } = req.body;
  if (!amount || !category || !type) {
    return res.status(400).json({ message: "All fields required" });
  }

 
  try {
    const newTransaction = new Transaction({
      amount,
      category,
      type,
      user: req.user.id, // ✅ associate with user
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/transactions/:id
router.delete("/:id", authmidware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // secure: only delete user's own
    });

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;