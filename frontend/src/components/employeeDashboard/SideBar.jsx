import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import {
  FaBuilding,
  FaCalendarCheck,
  FaTachometerAlt,
  FaTools,
  FaUsers,
} from "react-icons/fa";

const SideBar = () => {
  const {user}= useAuth()
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl font-bold">Employee MS</h3>
      </div>

      <div className="space-y-2 mt-2">
        <NavLink
          to="/employee-dashboard"
          end
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaCalendarCheck />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-2.5 px-4 rounded ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaTools />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;