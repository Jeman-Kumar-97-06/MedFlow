import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // Staff who booked the appointment
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // optional: can also be Doctor
      default: null,
    },

    date: {
      type: String,  // "2025-11-25"
      required: true,
    },

    time: {
      type: String,  // "10:30 AM"
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },

    // Link to consultation if completed
    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
      default: null,
    },

    // Auto reminders, CRM triggers
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
