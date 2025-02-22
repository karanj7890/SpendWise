import React, { useState } from "react";
import { Eye, EyeOff, Check, X, LockKeyhole } from "lucide-react";
import { PasswordStrengthIndicator } from "../PasswordIndicator";
import { useOtpStore } from "../../store/useOtpStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const NewPasswordForm = () => {

  const {handlePasswordUpdate,isLoading,email}= useOtpStore()
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { text: "At least one lowercase letter", met: /[a-z]/.test(password) },
    { text: "At least one number", met: /[0-9]/.test(password) },
    { text: "At least one special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword){
        toast.error("Passwords do not match!");
        return;}

    const success= await handlePasswordUpdate({email,password});
    if(success){
        setTimeout(() => {
        navigate("/login");
        }, 1000);
    }
  };

  const isValid = password === confirmPassword && requirements.every((req) => req.met);

  return (
    <div className="w-full max-w-md space-y-8 px-4">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)
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
          
          <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole  className="h-5 w-5 text-gray-400" />
                </div>
              
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="ReEnter your Password"
                className= "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            
            </div>
          </div>
          <PasswordStrengthIndicator password={password} />
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Password requirements:</p>
            <ul className="space-y-1">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center text-sm">
                  {req.met ? <Check className="h-4 w-4 text-green-500 mr-2" /> : <X className="h-4 w-4 text-gray-300 mr-2" />}
                  <span className={req.met ? "text-gray-900" : "text-gray-500"}>{req.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};
