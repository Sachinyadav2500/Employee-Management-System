import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Add = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [leave, setLeave] = useState({
        userId: user?._id || "",
        leaveType: "",
        fromDate: "",
        toDate: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/leave/add`,leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
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
    };

    return (
        <div className="max-w-5xl mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-8">Request for Leave</h2>

            <form onSubmit={handleSubmit}>
                {/* Leave Type */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Leave Type
                    </label>
                    <select
                        name="leaveType"
                        value={leave.leaveType}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Paid Leave">Paid Leave</option>
                        <option value="Emergency Leave">Emergency Leave</option>
                    </select>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            From Date
                        </label>
                        <input
                            type="date"
                            name="fromDate"
                            value={leave.fromDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            To Date
                        </label>
                        <input
                            type="date"
                            name="toDate"
                            value={leave.toDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        name="description"
                        value={leave.description}
                        onChange={handleChange}
                        placeholder="Reason"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 transition"
                >
                    Apply Leave
                </button>
            </form>
        </div>
    );
};

export default Add;