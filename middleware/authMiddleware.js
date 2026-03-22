const jwt = require("jsonwebtoken")
const User = require ("../models/userModel.js");

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {

        const verified = jwt.verify(token, "JWT-SECRET");

        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();

    } catch (err) {

        console.log("JWT Verification failed");

        return res.status(401).json({ message: "Invalid token" });

    }
};

module.exports= authMiddleware;