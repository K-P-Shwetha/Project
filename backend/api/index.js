const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("../config/db");
require("dotenv").config();
const cors = require("cors");

const regRoute = require("../routes/reg");
const loginRoute = require("../routes/login");
const transactionRoutes = require("../routes/transactionRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*", credentials: true })); // You can restrict origin later if needed
app.use(express.json()); // For JSON payloads

// API routes
app.use("/api", regRoute);
app.use("/api", loginRoute);
app.use("/api/transactions", transactionRoutes);

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

// Export as serverless function
module.exports = app;
module.exports.handler = serverless(app);
