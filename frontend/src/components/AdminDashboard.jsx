import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from './AdminSidebar'
import Navbar from './Navbar'
import AdminSummary from './AdminSummary'
import { Outlet } from 'react-router-dom'


const AdminDashboard = () => {
  const {user }= useAuth()

  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
