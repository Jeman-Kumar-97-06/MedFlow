import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {type: String,required: true,trim: true,},
    phone: {type: String,required: true,},
    email: {type: String,default: "",},
    password: {typs: String,required:true},
    gender: {type: String,enum: ["male", "female", "other"],default: "other",},
    age: {type: Number,default: null,},
    address: {type: String,default: "",},
    // Helpful for CRM analytics
    // "diabetic", "asthma", "returning", etc.
    tags: {type: [String],default: [],},
    // You can link to visits later
    medicalHistory: [
      {
        condition: String,
        note: String,
        date: { type: Date, default: Date.now },
      },
    ],

    // For storing uploaded reports (PDFs/images)
    reports: [
      {
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
