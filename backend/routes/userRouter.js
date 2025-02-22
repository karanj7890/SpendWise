import express from 'express'
import {signup,login , logout,profile, forgetPassword, verifyOTP, updateUserProfile, changeUserPassword, checkAuth} from '../controllers/usersController.js'
import { protectRoute } from '../middlewares/isAuth.js'

const router= express.Router()

// signup
router.post("/signup", signup)

// login
router.post("/login",login)

// logout
router.post("/logout",logout)

// forgetPassword
router.post("/forget-password", forgetPassword);

// verify otp
router.post("/verifyotp", verifyOTP);

// profile
router.get('/profile',protectRoute, profile)
// change user password
router.put("/change-password",changeUserPassword)
// update user profile
router.put("/update-profile",protectRoute, updateUserProfile)
// this checkAuth is used if a user refreshes the window it will tell it they have been logged out or not
router.get("/check",protectRoute,checkAuth);


export default router
