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
    medicalHistory: [{condition: String,note: String,date: { type: Date, default: Date.now },},],
    // For storing uploaded reports (PDFs/images)
    reports: [{url: String,uploadedAt: { type: Date, default: Date.now },},],
  },
  { timestamps: true }
);

patientSchema.statics.signup = async function(name,phone,email,password,gender,age,address,tags,medicalHistory,reports){
  if (!name || !phone || !email || !password || !gender || !age || !address || !tags || !medicalHistory || !reports) {
        throw Error("All fields must be filled!")
  };
  if (!validator.isEmail(email)){
    throw Error("Invalid Email!")
  }
  if (!validator.isStrongPassword(password)){
    throw Error("Password is not strong enough!")
  }
  if (!phone && !/^[6-9]\d{9}$/.test(phone)){
    throw Error("Invalid Phone Number")
  }
  const exists = this.findOne({email});
  if (exists) {
    throw Error("Email Already Exists!");
  };
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  const user = await this.creaate({name,phone,email,password:hash,gender,age,address,tags,medicalHistory,reports});
  return user;
}

patientSchema.statics.login = async function(email,password){
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({email:email});
  if (!user) {
    throw Error("No User with the given email!");
  }
  const match = await bcrypt.compare(password,user.password);
  if (!match){
    throw Error("Incorrect Password");
  };
  return user;
}

export default mongoose.model("crmpatient", patientSchema);
