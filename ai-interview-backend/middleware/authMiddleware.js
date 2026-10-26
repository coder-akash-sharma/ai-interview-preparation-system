const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user ID in request
    req.userId = decoded.userId;

    // Continue
    next();

  } catch (error) {
    console.error("Auth error:", error);

    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
};

module.exports = authMiddleware;