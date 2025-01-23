// Import necessary modules
const express = require("express"); // creating express server
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const mindmapRoutes = require("./routes/mindmapRoutes");

// Initialize express app
const app = express(); //calling the express function

// we can do app.put, app.delete, app.get, etc. any CRUD requests

// Middleware
app.use(express.json());
app.use(cors());

// Check for MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Register routes
app.use("/api/mindmaps", mindmapRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("MindMapr Backend is running!");
});

// Route not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
