import { generateToken } from "../utils/jwtToken.js"
import User from "../model/User.js"
import bcrypt from "bcryptjs"
import OTP from "../model/OTP.js"
import nodemailer from 'nodemailer';
import crypto from 'crypto';


export const signup= async (req,res)=>{
    const {username,email,password}= req.body
    
    try {
        if(!username || !email || !password){
            return res.status(400).json({message:"Please fill in all fields"})
        }
        //we will hash the password
        if(password.length < 8){
            return res.status(400).json({message:"Password must be of length 8"})
        }
        if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({message:"Invalid email format. Backend validation failed"});
        const user= await User.findOne({email})

        if(user) return res.status(400).json({message:"Email already exist"});

        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser= new User({
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            // now we will generate jwt token here 
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            });
        }
        else{
            return res.status(400).json({message:"Failed to create new user"})
        }
    } catch (error) {
        console.log("Error in signup", error.message);
        return res.status(500).json({message:"Internal server error"})
        
    }
}

export const login= async (req,res)=>{
    const {email,password}= req.body;
    try {
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not Found"})
        }

       
        user.password = await bcrypt.hash(password, 10);


        const isPasswordCorrect= await bcrypt.compare(password, user.password)
        

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        console.log(isPasswordCorrect);
        

        const jwt= generateToken(user._id,res)

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            jwt: jwt
            
        });

    } catch (error) {
        console.log("Error in login", error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}


export const logout= (req,res)=>{
    // in this we only clear the cookies that are present
    try {
        res.cookie("jwt", "",{maxAge:0})
        res.status(200).json({message:"Logged Out Succesfully"})
    } catch (error) {
        console.log("Error in logout", error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const profile= async(req,res)=>{
    const user= await User.findById(req.user);
    if(!user){
        return res.status(400).json({message:"User Not Found"});
    }

    res.send({username:user.username, email: user.email});
}


export const forgetPassword= async(req,res)=>{
    const {email}= req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('User  not found');
    }

    const otp= crypto.randomInt(100000, 999999).toString();
    const otpuser= await OTP.findOne({email})
    if(otpuser){
            await OTP.updateOne({email},{$set:{otp:otp}})
    }
    else{
        // Save OTP to the database
        const otpEntry = new OTP({ email, otp });
        await otpEntry.save();
    }

    // Send OTP via email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    });


}


export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    const otpEntry = await OTP.findOneAndDelete({ email, otp });
    
    if (!otpEntry) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
  
    res.status(200).json({ success: true, message: 'OTP verified successfully' });
};


export const updateUserProfile = async (req, res) => {
    const { email, username } = req.body;

    // Check if the user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: "User  not authenticated" });
    }

    try {
        const updatedUser  = await User.findByIdAndUpdate(
            req.user, // Assuming req.user contains the user ID
            { username, email },
            { new: true }
        );

        // Check if the user was found and updated
        if (!updatedUser ) {
            return res.status(404).json({ message: "User  not found" });
        }

        res.json({ message: "User  profile updated successfully", updatedUser  });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const changeUserPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      //! Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      //! Validate password length
      if (newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
      }
  
      //! Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(String(newPassword), salt);
      user.password = hashedPassword;
  
      //! Save the updated password
      await user.save({ validateBeforeSave: false });
  
      res.status(201).json({ 
        success: true,
        message: "Password changed successfully",
        data: {
          email: user.email,
          updatedAt: new Date()
        }
      });

    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ 
        success: false,
        message: error.response?.data?.message || "Failed to update password. Please try again later.",
        error: error.message 
      });

    }
  };
  

export const checkAuth= (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth", error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}
