const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const regRoute = require("./routes/reg");
const loginRoute = require("./routes/login");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database first
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // JSON parser

// Routes
app.use("/api", regRoute);
app.use("/api", loginRoute);
app.use("/api/transactions", transactionRoutes);

// Server Listen
module.exports.handler = serverless(app);
