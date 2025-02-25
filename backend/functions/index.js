const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Import the Express app from server.js (which contains routes and MongoDB connection)
const app = require("./server.js");

// Export the Express app as a Firebase Function
exports.api = onRequest(app);
