const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const validator= require('validator');

const doctorSchema = new mongoose.Schema(
  {
    name: {type: String,required: true,trim: true,},
    email: {type: String,required: true,unique: true,},
    phone: {type: String,required: true,},
    password: {type: String,required: true,},
    specialization: {type: String,default: "",},
    experience: {type: Number,default: 0,},// in years
    // Example: Morning 10–1, Evening 5–9
    availableSlots: [
      {
        day: { type: String }, // Monday, Tuesday, etc.
        from: { type: String }, // "10:00"
        to: { type: String },   // "13:00"
      },
    ],
    role: {
      type: String,
      enum: ["doctor", "admin"],
      default: "doctor",
    },
  },
  { timestamps: true }
);

doctorSchema.statics.signup = async function(name,email,phone,password,specialization,experience,availableSlots,role){
    if(!name || !email || !password || !specialization || !experience || !availableSlots || !role){
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)){
        throw Error("Invalid Email!")
    }
    if (!phone && !/^[6-9]\d{9}$/.test(phone)){
        throw Error("Invalid Phone Number")
    }
    if (role!=='doctor' || role!=='admin'){
        throw Error("Select a valid role! Doctor/Admin")
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password not strong enough!")
    }
}

export default mongoose.model("crmdoctor", doctorSchema);
