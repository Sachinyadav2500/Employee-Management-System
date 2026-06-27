import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddDepartment = () => {
    const [department, setdepartment] = useState({
        dep_name:"",
        description:""
    })

    const navigate= useNavigate()

    const handleChange=(e)=>{
        const {name,value}= e.target;
        setdepartment({...department,[name]:value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const response =await axios.post("http://localhost:5000/api/department/add" , department , {
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if(error && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Department</h3>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="dep-name" className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                        <input
                            type="text"
                             name="dep_name"
                            placeholder='Enter department name'
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2"> Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            required
                             onChange={handleChange}
                            placeholder='Enter description'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-md transition duration-200">Add Department </button>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment
