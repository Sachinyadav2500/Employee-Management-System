import React from 'react'
import SideBar from './employeeDashboard/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const EmployeeDashboard = () => {
    
  return (
    <div className='flex'>
      <SideBar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default EmployeeDashboard
