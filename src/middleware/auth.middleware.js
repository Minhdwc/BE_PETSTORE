const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { generateAccessToken } = require("../provider/jwt.service");

const isAuthen = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decode.id;

    if (!userId) {
      return res.status(401).json({ message: "Invalid token: no user ID" });
    }
    if(decode.exp * 1000 - new Date().getTime() < 1000 * 60 * 5) {
      console.log("đã cấp lại token mới");
      generateAccessToken(decode);
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("=== Error in auth middleware ===", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(500).json({ message: "Authentication failed" });
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
