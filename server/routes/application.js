const express = require("express");
const mongoose = require("mongoose");
const Application = require("../models/Application");

const router = express.Router();

// Submit an application
router.post("/", async (req, res) => {
  try {
    const { studentName, email, rollNumber, internshipId, internshipTitle } =
      req.body;

    if (
      !studentName?.trim() ||
      !email?.trim() ||
      !rollNumber?.trim() ||
      !internshipId ||
      !internshipTitle
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const application = await Application.create({
      studentName,
      email,
      rollNumber,
      internshipId,
      internshipTitle,
    });

    return res.status(201).json({
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error("Application submission error:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Unable to submit application. Please try again.",
    });
  }
});

// Retrieve all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    return res.json(applications);
  } catch (error) {
    console.error("Fetch applications error:", error.message);
    return res.status(500).json({
      message: "Unable to retrieve applications.",
    });
  }
});

// Retrieve one application by MongoDB ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid application ID." });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    return res.json(application);
  } catch (error) {
    console.error("Fetch application error:", error.message);
    return res.status(500).json({
      message: "Unable to retrieve application.",
    });
  }
});

module.exports = router;