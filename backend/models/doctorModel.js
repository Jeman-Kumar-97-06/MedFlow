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
    //see if the email already exists:
    const exists = this.findOne({email});
    if(exists){
      throw Error("Email Already Exists!")
    };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({name,email,phone,password:hash,specialization,experience,availableSlots,role});
    return user;
}

doctorSchema.statics.login = async function(email,password){
  if(!email || !password){
    throw Error("All fields must be filled");
  }
  //See if the user with the given email exists:
  const user = await this.findOne({email:email});
  if (!user) {
    throw Error("No User with the given email")
  }
  //See if the given password is right:
  const match = await bcrypt.compare(password,user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
}

export default mongoose.model("crmdoctor", doctorSchema);
