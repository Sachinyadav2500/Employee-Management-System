import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js"


const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, fromDate, toDate, description, } = req.body;

        const employee = await Employee.findOne({ userId })

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: "Employee not found"
            });
        }

        const newLeave = new Leave({
            employeeId: employee._id, leaveType, fromDate, toDate, description
        })

        await newLeave.save()
        return res.status(200).json({ success: true })
    } catch (error) {
        console.error("ADD LEAVE ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

    const getLeave = async (req, res) => {
        try {
            const { id, role } = req.params;
            let leaves
            if (role === "admin") {
                leaves = await Leave.find({ employeeId: id })
            } else {
                const employee = await Employee.findOne({ userId: id })
                leaves = await Leave.find({ employeeId: employee._id })
            }
            return res.status(200).json({ success: true, leaves })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Leave add server error" })
        }
    }

    const getLeaves = async (req, res) => {
        try {
            const leaves = await Leave.find().populate({
                path: "employeeId",
                populate: [
                    {
                        path: "department",
                        select: "dep_name",
                    },
                    {
                        path: "userId",
                        select: "name",
                    },
                ],
            });

            return res.status(200).json({ success: true, leaves })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Leave add server error" })
        }
    }

    const getLeaveDetails = async (req, res) => {
        try {
            const { id } = req.params;
            const leave = await Leave.findById({ _id: id }).populate({
                path: "employeeId",
                populate: [
                    {
                        path: "department",
                        select: "dep_name",
                    },
                    {
                        path: "userId",
                        select: "name profileImage",
                    },
                ],
            });

            return res.status(200).json({ success: true, leave })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Leave details fetch  server error" })
        }
    }

    const updateLeave = async (req, res) => {
        try {
            const { id } = req.params;
            const leave = await Leave.findByIdAndUpdate({ _id: id }, { status: req.body.status })
            if (!leave) {
                return res.status(404).json({ success: false, error: "Leave not found " })
            }
            return res.status(200).json({ success: true })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Leave add server error" })
        }
    }

    export { addLeave, getLeave, getLeaves, getLeaveDetails, updateLeave };