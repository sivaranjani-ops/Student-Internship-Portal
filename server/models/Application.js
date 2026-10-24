const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"],
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
    },
    internshipId: {
      type: String,
      required: [true, "Select an internship"],
    },
    internshipTitle: {
      type: String,
      required: [true, "Internship title is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);