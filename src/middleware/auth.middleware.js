const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthen = async (req, res, next) => {
  console.log("=== Auth middleware called ===");
  console.log("Headers:", req.headers);
  
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);
  
  if (!authHeader?.startsWith("Bearer ")) {
    console.log("No Bearer token found");
    return res.status(401).json({ message: "No token provided" });
  }
  
  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token ? "Token exists" : "No token");
  
  try {
    console.log("Verifying JWT token...");
    
    // Verify with backend JWT_SECRET (HS256 algorithm)
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT verified with HS256 (backend)");
    console.log("JWT decoded:", decode);
    
    // Extract user ID from backend JWT format
    const userId = decode.id;
    if (!userId) {
      throw new Error("No user ID found in token");
    }
    
    console.log("Extracted userId:", userId);
    
    console.log("Finding user in database...");
    const user = await User.findById(userId);
    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("User not found in database");
      return res.status(500).json({ message: "User not found" });
    }

    console.log("Setting req.user:", user._id);
    req.user = user;
    next();
  } catch (err) {
    console.error("=== Error in auth middleware ===");
    console.error("Error:", err);
    console.error("Error stack:", err.stack);
    return res.status(500).json({ message: err.message });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "No permissions" });
  }
  next();
};

module.exports = {
  isAuthen,
  isAdmin,
};
