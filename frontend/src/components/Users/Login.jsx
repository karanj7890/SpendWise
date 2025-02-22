import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LuLoader } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword]= useState(false)

  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    console.log(formData.email);

    if (success) {
      setTimeout(() => {
        console.log("Redirecting to dashboard...");
        navigate("/dashboard");
      }, 1000);
    }
    console.log(success);
    
  };


  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiMail className="h-5 w-5 text-gray-400" />
          </div>
      
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
          placeholder="Enter Your Email"
        />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockKeyhole  className="h-5 w-5 text-gray-400" />
          </div>
        
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          placeholder="Enter Your Password"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <p className="text-right">
        <Link to="/forget-password" className=" text-sm font-medium text-green-600 hover:text-green-700">
          Forget Password?
        </Link>
      </p>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer flex items-center justify-center"
        disabled={isLoggingIn}
      >
        {isLoggingIn ? (
          <>
          <LuLoader className="h-5 w-5 animate-spin mr-2"/>
          Loading ...
          </>
        ) :  (
          "Sign in"
        )}
       
      </button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-green-600 hover:text-green-700">
          Sign up
        </Link>
      </p>
    </form>
  );
};
