import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'





const List = () => {
  const [employees, setemployees] = useState([])
  const [empLoading, setempLoading] = useState(false)
  const [filterdEmployee, setfilterdEmployee] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setempLoading(true)
      try {
        const responce = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (responce.data.success) {
          let sno = 1
          const data = await responce.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name:emp.userId.name,
              dob:new Date(emp.dob).toLocaleDateString(),
              profileImage:<img src={`http://localhost:5000/uploads/${emp.userId.profileImage}`} className="w-20 h-20 rounded-full"/>,
              action: (<EmployeeButtons _id={emp._id}/>)
            }
          ))
          setemployees(data)
          setfilterdEmployee(data)
        }
      } catch (error) {
        if (error && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      finally {
        setempLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  const handleFilter =(e)=>{
    const records = employees.filter((emp)=>(
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setfilterdEmployee(records)
  }
  return (
    <div className='p-5'>
      <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Employees </h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='Searh by Emp Name'onChange={handleFilter} className='px-5 py-0.5 border' />
          <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Employee</Link>
        </div>
        <div>
          <DataTable columns={columns} data={filterdEmployee} pagination/>
        </div>
    </div>
  )
}

export default List
