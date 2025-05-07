const express = require("express");
const PDFDocument = require("pdfkit");
const authMiddleware = require("../middlewares/auth");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.get("/settings", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ user: userId });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=transactions.pdf");

    doc.pipe(res);
    doc.fontSize(18).text("Transaction Report", { align: "center" });
    doc.moveDown(1);
    
    // Add user info
    doc.text(`Generated On: ${new Date().toLocaleString()}`);
    doc.moveDown(1);
    
    // Title for transactions
    doc.fontSize(16).text("Your Transactions:", { underline: true });
    doc.moveDown(0.5);
    
    transactions.forEach((txn, idx) => {
      doc
        .fontSize(12)
        .text(`${idx + 1}. Category: ${txn.category} | Type: ${txn.type} | Amount: ₹${txn.amount} | Date: ${new Date(txn.date).toLocaleDateString()}`)
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Failed to generate PDF" });
  }
});

module.exports = router;
