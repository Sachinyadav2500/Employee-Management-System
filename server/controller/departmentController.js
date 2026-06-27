import { response } from "express";
import Department from "../models/Department.js"

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({ success: true, departments })
    } catch (error) {
        console.log("GET DEPARTMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({ success: true, department: newDep })
    } catch (error) {
        console.log("ADD DEPARTMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                error: "Department not found"
            });
        }

        return res.status(200).json({
            success: true,
            department
        });

    } catch (error) {
        console.log("GET DEPARTMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const { dep_name, description } = req.body
        const updateDep = await Department.findByIdAndUpdate((id), {
            dep_name, description
        })
        return res.status(200).json({ success: true, updateDep })
    } catch (error) {
        console.log("update DEPARTMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const deleteDep = await Department.findById((id))
        await deleteDep.deleteOne()

        return res.status(200).json({ success: true, deleteDep })
    } catch (error) {
        console.log("delete DEPARTMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export { addDepartment, getDepartments, getDepartment, updateDepartment ,deleteDepartment}