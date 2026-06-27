import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "Authorization header missing"
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "Token not provided"
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                error: "Invalid token"
            });
        }

        // Find user
        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User does not exist"
            });
        }

        // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        console.error("AUTH MIDDLEWARE ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default verifyUser;