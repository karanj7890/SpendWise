import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OTPInput } from "./OtpInput";
import { useOtpStore } from "../../store/useOtpStore";


export const OTPVerificationForm = () => {
  
  const { sendOtp, verifyOtp, handleSubmitEmail, email } = useOtpStore();
  const navigate = useNavigate();

  
  // Validate email exists
  // useEffect(() => {
  //   if (!email) {
  //     setMessage("Email address is required. Please try again.");
  //     return;
  //   }
  // }, [email]);



  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) navigate("/forget-password")
    
    const lastSavedTimestamp = localStorage.getItem("otpTimestamp");
    


    if (lastSavedTimestamp) {
      const elapsedTime = Math.floor((Date.now() - parseInt(lastSavedTimestamp, 10)) / 1000);
      const remainingTime = Math.max(0, 30 - elapsedTime);

      if (remainingTime > 0) {
        setTimer(remainingTime);
        setCanResend(false);
      } else {
        setTimer(0);
        setCanResend(true);
        localStorage.removeItem("otpTimestamp");
        localStorage.removeItem("canResend");
      }
    } else {
      setTimer(30);
      setCanResend(false);
      localStorage.setItem("otpTimestamp", Date.now().toString());
      localStorage.removeItem("canResend");
    }
  }, []);

  // Countdown effect with localStorage update
  useEffect(() => {
    if (timer <= 0 || canResend) return; 

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev - 1 <= 0) {
          clearInterval(interval);
          setCanResend(true);
          localStorage.setItem("canResend", "true");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, canResend]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Verifying...");

    // Convert OTP array to string
    const otpString = Array.isArray(otp) ? otp.join("") : "";

    if (otpString.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      setIsSubmitting(false);
      return;
    }
  

    try {
      const success = await verifyOtp(otpString);


      if (success) {
        setMessage("Verification successful");
        setCanResend(false);
        setOtp("");
        setIsSubmitting(false);
        localStorage.removeItem("canResend");
        setTimeout(() => {
          navigate("/new-password");
          handleSubmitEmail(email) 
        }, 2000);
        
      }
    }
    catch{
      setMessage("Invalid OTP");
      setOtp("");
      setIsSubmitting(false);
    }
    
  }

  const handleResend = async () => {
    if (!email) {
      setMessage("Email is missing. Please try again.");
      console.error("Email is undefined or null.");
      return;
    }

    setCanResend(false);
    setTimer(30);
    localStorage.setItem("otpTimer", "30");
    localStorage.setItem("otpTimestamp", Date.now().toString());
    localStorage.removeItem("canResend"); // Remove previous resend flag
    setMessage("Resending code...");

    try {
      console.log(email);
      
      const success = await sendOtp(email);


      if (success) {
        setMessage("A new verification code has been sent to your email.");
      } else {
        setMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setMessage("Something went wrong. Try again.");
      setCanResend(true);
      localStorage.setItem("canResend", "true");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Check your email</h2>
        <p className="mt-2 text-sm text-gray-600">
          {email ? (
            <>
              We've sent a verification code to
              <br />
              <span className="font-medium text-gray-900">{email}</span>
            </>
          ) : (
            "Please enter your email address to receive a verification code."
          )}
        </p>

      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <OTPInput length={6} value={otp} onChange={setOtp} />
          <div className="text-center text-sm text-gray-600">
            {!canResend ? (
              <p>Resend code in <span className="font-medium text-gray-900">{timer}s</span></p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </button>
        </div>
        {message && (
          <div className="text-sm text-center text-green-600">{message}</div>
        )}
      </form>
    </div>
  );
};
