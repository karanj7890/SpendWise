import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


// Auth store for managing authentication state
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSignningUp: false,
  isLoggingIn: false,
  isCheckingAuth:true,
  isUpdatingProfile:false,
  
  checkAuth: async() => {
    set({ isCheckingAuth: true });
    try {
        const res= await axiosInstance.get("/api/auth/check")
        set({authUser: res.data})
    } catch (error) {
        console.log("Error in checkAuth",error);
        set({authUser:null})
    } finally{
        set({isCheckingAuth:false})
    }
},

  signup: async(data)=>{
        set({isSignningUp:true})
        try {
            const res = await axiosInstance.post("/api/auth/signup", data);
            set({authUser: res.data})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSignningUp:false})
        }   
  },

    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/api/auth/login", data);
            set({authUser: res.data})
            toast.success("You are now Signed in")
            return true; //indicate success
        } catch (error) {
            toast.error(error.res.data.message)
            return false; //indicate failure
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout: async()=> {
        try {
            await axiosInstance.post("/api/auth/logout")
            set({authUser:null})
            toast.success("Logged Out Successfully")

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res= await axiosInstance.put("/api/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile Updated Successfully")
        } catch (error) {
            toast.error(error.res.data.message)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },

}));
