import React from "react";

export const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    return {
      strength,
      label: labels[strength - 1] || "",
    };
  };

  const { strength, label } = getStrength();
  const bars = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {bars.map((bar) => (
          <div
            key={bar}
            className={`h-1 w-full rounded-full ${
              bar <= strength
                ? {
                    1: "bg-red-500",
                    2: "bg-orange-500",
                    3: "bg-yellow-500",
                    4: "bg-green-500",
                    5: "bg-green-600",
                  }[bar]
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs text-gray-600">
          Password strength: <span className="font-medium">{label}</span>
        </p>
      )}
    </div>
  );
};