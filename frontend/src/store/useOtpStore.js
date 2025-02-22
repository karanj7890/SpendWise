import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useOtpStore = create((set, get) => ({
  otpData: null,
  isLoading: false,
  error: null,
  isVerified: false,
  email: "",
  handleSubmitEmail: null,
  lastEmailSent: null,



  // Actions
  sendOtp: async (email) => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/api/auth/forget-password", { email });
      set({ otpData: { email }, email, lastEmailSent: Date.now(), isLoading: false });

      toast.success('OTP sent successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  verifyOtp: async (otpCode) => {
    set({ isLoading: true, error: null });
    try {
      const email = get().otpData?.email; // Retrieve stored email
      if (!email) throw new Error("Email not found. Please request OTP again.");

      const response = await axiosInstance.post("/api/auth/verifyotp", { email, otp: otpCode });
      set({ isVerified: true, isLoading: false });
      toast.success('OTP verified successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  handlePasswordUpdate: async(password)=>{
    set({isLoading:true,error:null})
    try {
      const email = get().otpData?.email;
      if (!email) throw new Error("Email not found. Please request OTP again.");

      const response= await axiosInstance.put("/api/auth/change-password", {email, newPassword: password,});
      console.log(response.data);
      set({isLoading:false});
      toast.success("Password updated successfully! Redirecting to login...");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
    
  },

  resetOtpState: () => {
    set({ 
      otpData: null,
      isLoading: false,
      error: null,
      isVerified: false,
      email: "",
      handleSubmit: null,
      lastEmailSent: null
    });
  },

  // Get time since last OTP was sent
  getTimeSinceLastOtp: () => {
    const { lastEmailSent } = get();
    if (!lastEmailSent) return null;
    return Date.now() - lastEmailSent;
  },

  setEmail: (email) => set({ email }),
  handleSubmitEmail: (email) => set({ email })

}));
