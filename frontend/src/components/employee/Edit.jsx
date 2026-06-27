import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [employee, setemployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: "",
    })
    const [departments, setdepartments] = useState(null)

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            console.log("Fetched Departments:", departments);
            setdepartments(departments || []);
        };
        getDepartments()
    }, [])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    const employee = response.data.employee
                    setemployee((prev) => ({ ...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus, salary: employee.salary, designation: employee.designation, department: employee.department }))
                }
            } catch (error) {
                console.error("Employee Fetch Error:", error);

                if (error.response) {
                    console.log(error.response.data);
                    alert(error.response.data.error);
                } else {
                    alert(error.message);
                }
            }
        }
        fetchEmployee()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target
        setemployee((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
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
        <>{departments && employee ? (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
                    <h2 className="text-2xl font-bold text-center mb-8">Edit Employee</h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>


                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name='name'
                                value={employee.name}
                                onChange={handleChange}
                                required
                                placeholder="Insert Name"
                                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Marital Status</label>
                            <select value={employee.maritalStatus} name='maritalStatus' onChange={handleChange} required className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
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
                                value={employee.designation}
                                name='designation'
                                onChange={handleChange}
                                placeholder="Designation"
                                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Salary</label>
                            <input
                                type="number"
                                required
                                value={employee.salary}
                                name='salary'
                                onChange={handleChange}
                                placeholder="Salary"
                                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className='col-span-2'>
                            <label className="block text-sm font-medium mb-2">Department</label>
                            <select value={employee.department} required name='department' onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                                Update Employee
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        ) : <div>Loading...</div>}</>
    )
}

export default Edit
