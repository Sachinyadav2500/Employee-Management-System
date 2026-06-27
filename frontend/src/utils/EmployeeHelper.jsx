import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "S.NO.",
        selector: (row) => row.sno,
        width:'80px'
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable:true,
        width:'180px'

    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width:'150px'
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width:'130px'
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable:true,
        width:'150px'
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center:true
    }
]

export const fetchDepartments = async () => {
    try {
        const response = await axios.get(
            "http://localhost:5000/api/department",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log("Department API Response:", response.data);

        if (response.data.success) {
            return response.data.departments;
        }

        return [];
    } catch (error) {
        console.error("Department Fetch Error:", error);

        if (error.response) {
            alert(error.response.data.error);
        } else {
            alert("Unable to connect to server");
        }

        return [];
    }
};

// function for salary form
export const getEmployees = async (id) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/employee/department/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log("Employee API Response:", response.data);

        if (response.data.success) {
            return response.data.employees;
        }

        return [];
    } catch (error) {
        console.error("Employee Fetch Error:", error);

        if (error.response) {
            alert(error.response.data.error);
        } else {
            alert("Unable to connect to server");
        }

        return [];
    }
};


export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 text-white bg-teal-600"
                onClick={() =>
                    navigate(`/admin-dashboard/employee/${_id}`)
                }
            >
                View
            </button>

            <button
                className="px-3 py-1 text-white bg-blue-600"
                onClick={() =>
                    navigate(`/admin-dashboard/employees/edit/${_id}`)
                }
            >
                Edit
            </button>
            <button
                className="px-3 py-1 text-white bg-yellow-600"
                onClick={()=>navigate(`/admin-dashboard/employees/salary/${_id}`)}
            >
                Salary
            </button>
            <button
                className="px-3 py-1 text-white bg-red-600"
                onClick={()=>navigate(`/admin-dashboard/employees/leaves/${_id}`)}
            >
                Leave
            </button>
        </div>
    );
};