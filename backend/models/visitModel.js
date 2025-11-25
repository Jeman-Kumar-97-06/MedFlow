import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dosage: { type: String },        // e.g., 500mg
    frequency: { type: String },     // e.g., 1-0-1
    duration: { type: String },      // e.g., 5 days
    instructions: { type: String },  // e.g., after food
  },
  { _id: false }
);

const vitalsSchema = new mongoose.Schema(
  {
    bloodPressure: { type: String },     // "120/80"
    heartRate: { type: Number },         // bpm
    glucose: { type: Number },           // random/fasting
    temperature: { type: Number },       // Celsius
    respiratoryRate: { type: Number },   // breaths per min
    spo2: { type: Number },              // %
    weight: { type: Number },            // kg
    height: { type: Number },            // cm
  },
  { _id: false }
);

const visitSchema = new mongoose.Schema(
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

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    // -------------------------
    // Vitals
    // -------------------------
    vitals: vitalsSchema,

    // -------------------------
    // Symptoms + Diagnosis
    // -------------------------
    symptoms: { type: String },       // free text
    diagnosis: { type: String },      // free text / summary

    // -------------------------
    // Prescribed Medications
    // -------------------------
    medications: [medicationSchema],

    // -------------------------
    // Treatment Notes
    // -------------------------
    notes: { type: String },

    // -------------------------
    // Attachments (reports/images)
    // -------------------------
    attachments: [
      {
        url: String,
        filename: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    // -------------------------
    // Follow-up
    // -------------------------
    followUpDate: { type: Date },

    // -------------------------
    // Billing reference
    // -------------------------
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Visit", visitSchema);
