import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LuLoader } from "react-icons/lu";
import { PasswordStrengthIndicator } from "../PasswordIndicator";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { CiMail } from "react-icons/ci";
import { User } from 'lucide-react';

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { signup, isSignningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    setPasswordError("");
    signup(formData);
  };

  const {password} = formData;

  const requirements = [
    {
      text: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      text: "At least one uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      text: "At least one lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      text: "At least one number",
      met: /[0-9]/.test(password),
    },
    {
      text: "At least one special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
        
        <input
          type="username"
          id="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Enter your Username"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      </div>

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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your Email"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
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
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Enter your Password"
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
      
      
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockKeyhole  className="h-5 w-5 text-gray-400" />
          </div>
        
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="ReEnter your Password"
          className= "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
      
    <PasswordStrengthIndicator password={formData.password} />
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">
        Password requirements:
      </p>
      <ul className="space-y-1">
        {requirements.map((requirement, index) => (
          <li key={index} className="flex items-center text-sm">
            {requirement.met ? (
              <FaCheck className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <RxCross2 className="h-4 w-4 text-gray-300 mr-2" />
            )}
            <span
              className={
                requirement.met ? "text-gray-900" : "text-gray-500"
              }
            >
              {requirement.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
      
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer flex items-center justify-center"
        disabled={isSignningUp}
      >
        {isSignningUp ? (
          <>
            <LuLoader className="size-5 animate-spin mr-2" />
            Loading...
          </>
        ) : (
          "Create Account"
        )}
      </button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-green-600 hover:text-green-700">
          Sign in
        </Link>
      </p>
    </form>
  );
};
