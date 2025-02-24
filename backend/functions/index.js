/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const mindmapRoutes = require("./routes/mindmapRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = functions.config().mongodb.uri;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set in Firebase Config.");
  process.exit(1);
}

// MongoDB Connection
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

// Routes
app.use("/api/mindmaps", mindmapRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("MindMapr Backend is Running on Firebase!");
});

// Export the Express app as a Firebase Function

exports.api = onRequest(app);
