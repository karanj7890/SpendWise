import React from "react";
import { DollarSign } from "lucide-react";

export function Dollar({ children }) {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-green-50 -z-10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-5 transform -rotate-12">
          <DollarSign size={120} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 transform rotate-12">
          <DollarSign size={120} />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-5 transform rotate-45">
          <DollarSign size={80} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 opacity-5 transform -rotate-45">
          <DollarSign size={80} />
        </div>
      </div>
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>
      {children}
    </div>
  );
}
