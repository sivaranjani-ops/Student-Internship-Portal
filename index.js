require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const api = require("./routes/api");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => res.json({ message: "Student Internship Portal API is running" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.use("/api", api);
async function start() {
  try {
    if (!process.env.MONGO_DB_URI) throw new Error("MONGO_DB_URI is missing from environment variables");
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected successfully");
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}
start();
