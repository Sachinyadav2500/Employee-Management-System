import axios from "axios"
import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name: "S.NO.",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable:true
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Do you want to delete?"
        );

        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `http://localhost:5000/api/department/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.data.success) {
                onDepartmentDelete();
            }
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.error ||
                error.message ||
                "Delete failed"
            );
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 text-white bg-teal-600"
                onClick={() =>
                    navigate(`/admin-dashboard/department/${_id}`)
                }
            >
                Edit
            </button>

            <button
                className="px-3 py-1 text-white bg-red-600"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>
        </div>
    );
};