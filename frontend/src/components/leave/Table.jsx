import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns, LeaveButtons } from '../../utils/LeaveHelper'
import axios from 'axios'
import { useEffect } from 'react'


const Table = () => {
    const [leaves, setleaves] = useState(null)
    const [filterdLeaves, setfilterdLeaves] = useState(null)

    const fetchLeaves = async () => {

        try {
            const responce = await axios.get("http://localhost:5000/api/leave", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (responce.data.success) {
                let sno = 1
                const data = await responce.data.leaves.map((leave) => (
                    {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeId,
                        name: leave.employeeId.userId.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.dep_name,
                        days: new Date(leave.toDate).getDate() - new Date(leave.fromDate).getDate(),
                        status: leave.status,
                        action: (<LeaveButtons _id={leave._id} />)
                    }
                ))
                setleaves(data)
                setfilterdLeaves(data)
            }
        } catch (error) {
            if (error && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    useEffect(() => {
        fetchLeaves()
    }, [])

    const handleInput = (e) => {
        const data = leaves.filter((leave) => leave.employeeId
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
        setfilterdLeaves(data)
    }

    const handleclick = (status) => {
        const data = leaves.filter((leave) => leave.status
            .toLowerCase()
            .includes(status.toLowerCase())
        );
        setfilterdLeaves(data)
    }

    return (
        <>{filterdLeaves ? (
            <div className='p-5'>
                <div className='text-center'>
                    <h3 className='text-3xl font-bold'>Manage Leaves </h3>
                </div>
                <div className='flex justify-between items-center'>
                    <input type="text" placeholder='Searh by Emp Id' className='px-5 py-0.5 border' onChange={handleInput} />
                    <div className='space-x-3'>
                        <button className='px-4 py-1 bg-teal-600 rounded text-white'
                        onClick={()=>{handleclick("Pending")}}
                        >Pending</button>
                        <button className='px-4 py-1 bg-teal-600 rounded text-white'
                        onClick={()=>{handleclick("Approved")}}
                        >Approved</button>
                        <button className='px-4 py-1 bg-teal-600 rounded text-white'
                        onClick={()=>{handleclick("Rejected")}}
                        >Rejected</button>
                    </div>
                </div>
                <div className='mt-4'>
                    <DataTable columns={columns} data={filterdLeaves} pagination />
                </div>
            </div>
        ) : <div>Loading..</div>}</>
    )
}

export default Table
