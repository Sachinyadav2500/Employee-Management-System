import React, { useEffect, useState } from 'react'
import { fetchDepartments ,getEmployees} from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const Add = () => {
    const navigate = useNavigate()
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    })
    const [departments, setdepartments] = useState(null)
    const [employees, setemployees] = useState([])

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            console.log("Fetched Departments:", departments);
            setdepartments(departments || []);
        };
        getDepartments()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSalary((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:5000/api/salary/add`, salary, {
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

    const handleDepartment= async(e)=>{
        const emps= await getEmployees(e.target.value)
        setemployees(emps)
    }

    return (
        <>{departments ? (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
                    <h2 className="text-2xl font-bold text-center mb-8">Add Salary</h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        {/* Departments */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Department</label>
                            <select required name='department' onChange={handleDepartment} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Employees of that department */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Employee</label>
                            <select required name='employeeId' onChange={handleChange} className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Basic Salary</label>
                            <input
                                type="number"
                                required
                                name='basicSalary'
                                onChange={handleChange}
                                placeholder="Basic Salary"
                                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Allowance</label>
                            <input
                                type="number"
                                required
                                name='allowances'
                                onChange={handleChange}
                                placeholder="Allowance"
                                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Deduction</label>
                            <input
                                type="number"
                                required
                                name='deductions'
                                onChange={handleChange}
                                placeholder="Deduction"
                                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Pay Date</label>
                            <input
                                type="date"
                                required
                                name='payDate'
                                onChange={handleChange}
                                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>


                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                                Add Salary
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        ) : <div>Loading...</div>}</>
    )
}

export default Add
