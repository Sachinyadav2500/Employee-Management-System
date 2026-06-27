import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { useState } from 'react'
import { DepartmentButtons, columns } from '../../utils/DepartmentHelpers'

const DepartmentsList = () => {
  const [departments, setdepartments] = useState([])
  const [depLoading, setdepLoading] = useState(false)
  const [filterdDepartments, setfilterdDepartments] = useState([])


  const onDepartmentDelete = () => {
    fetchDepartments()
  }

   const fetchDepartments = async () => {
      setdepLoading(true)
      try {
        const responce = await axios.get("http://localhost:5000/api/department", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (responce.data.success) {
          let sno = 1
          const data = await responce.data.departments.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
            }
          ))
          setdepartments(data)
          setfilterdDepartments(data)
        }
      } catch (error) {
        if (error && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      finally {
        setdepLoading(false)
      }
    }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const filterDepartment = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setfilterdDepartments(records)
  }
  return (
    <>{depLoading ? <div>Loading...</div> :
      <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Departments </h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='Searh by dep Name' className='px-5 py-0.5 border' onChange={filterDepartment} />
          <Link to="/admin-dashboard/add-departments" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Department</Link>
        </div>
        <div className='mt-5'>
          <DataTable columns={columns} data={filterdDepartments} pagination />
        </div>
      </div>
    }</>
  )
}

export default DepartmentsList
