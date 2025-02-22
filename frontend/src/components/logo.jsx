import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
        <GiTakeMyMoney className="h-8 w-8 text-green-600" />
      
      <span>SpendWise</span>
    </div>
  );
};
