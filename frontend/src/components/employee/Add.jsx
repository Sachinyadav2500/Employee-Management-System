import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Add = () => {
    const navigate = useNavigate()
    const [departments, setdepartments] = useState([])
    const [formData, setformData] = useState({})

    
    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            console.log("Fetched Departments:", departments);
            setdepartments(departments || []);
        };
        getDepartments()
    }, [])


    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "image") {
            setformData((prevData) => ({ ...prevData, [name]: files[0] }))
        }
        else {
            setformData((prevData) => ({ ...prevData, [name]: value }))

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        try {
            const response = await axios.post("http://localhost:5000/api/employee/add", formDataObj, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/employee")
            }
        } catch (error) {
            console.log("FULL ERROR:", error);

            if (error.response) {
                console.log("RESPONSE DATA:", error.response.data);
                alert(error.response.data.error || "Request failed");
            } else {
                console.log(error.message);
                alert(error.message);
            }
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
                <h2 className="text-2xl font-bold text-center mb-8">Add New Employee</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>


                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name='name'
                            onChange={handleChange}
                            required
                            placeholder="Insert Name"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name='email'
                            required
                            onChange={handleChange}
                            placeholder="Insert Email"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Employee ID</label>
                        <input
                            type="text"
                            name='employeeId'
                            required
                            onChange={handleChange}
                            placeholder="Employee ID"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Date of Birth</label>
                        <input
                            type="date"
                            name='dob'
                            required
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <select name='gender' className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" required onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Marital Status</label>
                        <select name='maritalStatus' onChange={handleChange} required className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Designation</label>
                        <input
                            type="text"
                            required
                            name='designation'
                            onChange={handleChange}
                            placeholder="Designation"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <select required name='department' onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Salary</label>
                        <input
                            type="number"
                            required
                            name='salary'
                            onChange={handleChange}
                            placeholder="Salary"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            required
                            name='password'
                            onChange={handleChange}
                            placeholder="******"
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <select
                            required
                            name="role"
                            value={formData.role || ""}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Upload Image</label>
                        <input
                            type="file"
                            name='image'
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-gray-200 file:rounded-md"
                        />
                    </div>


                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                        >
                            Add Employee
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Add
