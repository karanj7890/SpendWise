import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useOtpStore } from "../store/useOtpStore";


export const ForgotPasswordForm = () => {
   const [formData, setFormData]= useState({
    email: "",
   })
   const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { sendOtp } = useOtpStore()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const success = await sendOtp(formData.email);

    if (success) {
      console.log("Redirecting to Otp...");
      setTimeout(() => {
        navigate("/otp-input");
      }, 1000);
    }

    setIsSubmitting(false);

    
  };

  return (
    
    <div className="w-full max-w-md space-y-8 px-4">
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })}

              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Reset Password"}
          </button>
        </div>
        <div className="text-sm text-center">
          <Link to="/login" className="font-medium text-green-600 hover:text-green-700">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};
