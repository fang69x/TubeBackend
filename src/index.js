// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from './app.js';
import connectDB from './db/database.js';

const PORT = process.env.PORT || 8000;

// Connect to Database and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!!!", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Handle Uncaught Errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
