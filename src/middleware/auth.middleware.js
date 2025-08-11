const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthen = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.spilit(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
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
