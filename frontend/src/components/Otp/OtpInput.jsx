import React, { useEffect, useRef } from "react";

export const OTPInput = ({ length = 6, value = [], onChange }) => {
  const inputRefs = useRef(new Array(length).fill(null));

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInput = (index, inputValue) => {
    const newValue = Array.isArray(value) ? [...value] : new Array(length).fill("");
    newValue[index] = inputValue;
    onChange(newValue);

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    const otpArray = pastedData.replace(/[^0-9]/g, "").split("").slice(0, length);

    onChange([...otpArray, ...new Array(length - otpArray.length).fill("")]);
  };

  return (
    <div className="flex gap-2 justify-center">
      {[...Array(length)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleInput(index, e.target.value.replace(/[^0-9]/g, ""))}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-blue-500 focus:ring-blue-500 outline-none ${
            value[index] && isNaN(value[index]) ? 'border-red-500' : ''
          }`}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};
