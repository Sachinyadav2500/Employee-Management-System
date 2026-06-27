import React from "react";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
    <div className="bg-white flex items-center w-full max-w-2xl shadow-sm border border-gray-200">
      
      {/* Icon Section */}
      <div className="bg-teal-600 h-14 w-14 flex items-center justify-center">
        <FaUsers className="text-white text-2xl" />
      </div>

      {/* Text Section */}
      <div className="px-4 py-2">
        <p className="text-gray-600 text-lg font-semibold">
          Welcome Back
        </p>

        <p className="text-2xl font-bold text-gray-800">
          {user?.name}
        </p>
      </div>

    </div>
    </div>
  );
};

export default Summary;