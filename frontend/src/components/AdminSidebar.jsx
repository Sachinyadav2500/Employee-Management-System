import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarCheck, FaMoneyBillWave, FaTachometerAlt, FaTools, FaUsers } from 'react-icons/fa';

const AdminSidebar = () => {
    return (
        <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
            <div className='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className='text-2xl text-center font-bold'>Employee MS</h3>
            </div>
            <div>
                <NavLink to='/admin-dashboard'
                    className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4   py-2.5 px-4  rounded`} end>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to='/admin-dashboard/employee'
                    className={({ isActive }) => 
                    `flex items-center space-x-4   py-2.5 px-4  rounded ${isActive ? "bg-teal-500 " : ""}`} end>
                    <FaUsers />
                    <span>Employees</span>
                </NavLink>

                <NavLink to='/admin-dashboard/departments'
                className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""} flex items-center space-x-4   py-2.5 px-4  rounded`} end>
                    <FaBuilding />
                    <span>Departments</span>
                </NavLink>

                <NavLink to='/admin-dashboard/leaves'
                    className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4   py-2.5 px-4  rounded`} end>
                    <FaCalendarCheck />
                    <span>Leaves</span>
                </NavLink>

                <NavLink to='/admin-dashboard/salary/add'
                    className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4   py-2.5 px-4  rounded`} end>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>

                <NavLink to='/admin-dashboard/settings'
                    className={({ isActive }) => `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4   py-2.5 px-4  rounded`} end>
                    <FaTools />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar
