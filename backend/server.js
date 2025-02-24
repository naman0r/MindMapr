// Import necessary modules
const functions = require("firebase-functions"); // Import Firebase Functions
const express = require("express"); // Create Express server
const mongoose = require("mongoose");
const cors = require("cors");

const { onRequest } = require("firebase-functions/v2/https");

// Import routes (ensure this path is correct)
const mindmapRoutes = require("./routes/mindmapRoutes");

// Initialize Express app
const app = express(); // Calling the express function

// Middleware
app.use(express.json());
app.use(cors());

// Load environment variables from Firebase Functions Config
const MONGO_URI = functions.config().mongodb.uri;
const OPENAI_API_KEY = functions.config().openai.key;

// Check for required environment variables
if (!MONGO_URI || !OPENAI_API_KEY) {
  console.error("Missing required environment variables in Firebase Config.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Register routes
app.use("/api/mindmaps", mindmapRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("MindMapr Backend is running on Firebase!");
});

// Route not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Set Firebase Functions to listen on PORT 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express app as a Firebase Function
exports.api = onRequest(app);
