const jwt = require("jsonwebtoken");

// Middleware for authentication
const requireSignin = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_URI); // Ensure consistency with JWT_SECRET
        req.userId = decoded.userId; // Store user ID in req for further use
        req.userRole = decoded.role; // Store role for authorization checks
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.userRole || req.userRole !== 1) {
        return res.status(403).json({ error: "Access denied. Only admin can perform this action." });
    }
    next();
};

module.exports = { requireSignin, isAdmin };
