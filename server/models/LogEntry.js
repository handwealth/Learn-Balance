// server/models/logEntry.js
import mongoose from "mongoose";

const logEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  studyHours: {
    type: Number,
    required: true
  },
  sleepHours: {
    type: Number,
    required: true
  },
  steps: {
    type: Number,
    required: true
  },
  foodQuality: {
    type: String,
    enum: ["Poor", "Average", "Good", "Excellent"],
    required: true
  },
  waterIntake: {
    type: Number, // in liters
    required: true
  }
});

export default mongoose.model("LogEntry", logEntrySchema);
