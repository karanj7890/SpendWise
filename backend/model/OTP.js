import mongoose from "mongoose";

const TempUser= new mongoose.Schema({
    
    email:{
        type: String,
        required:true,
        unique: true
    },
    otp:{
        type:String,
        required:true,
        minlength:6
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m', // OTP expires after 5 minutes
    },
}
)

const OTP= mongoose.model("OTP",TempUser);
export default OTP;