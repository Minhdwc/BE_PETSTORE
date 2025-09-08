const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const register = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validEmail = await User.findOne({ email: data.email });
      if (validEmail) {
        return reject({
          status: "Error",
          message: "Email already",
        });
      }
      const hashPassword = await bcrypt.hash(data.password, 10);
      const createData = {
        ...data,
        password: hashPassword,
      };
      const user = await User.create(createData);
      resolve({
        status: "Success",
        data: user,
        message: "User created successfully",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return reject({
          status: "Error",
          message: "User not found",
        });
      }

      const checkUser = await bcrypt.compare(password, user.password);
      if (!checkUser) {
        return reject({
          status: "Error",
          message: "Invalid password",
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await User.findOneAndUpdate({ email }, { refreshToken }, { new: true });

      resolve({
        status: "Success",
        data: {
          _id: user._id,
          name: user.name,
          role: user.role,
          accessToken,
          refreshToken,
        },
        message: "Login success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const logout = (id)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      await User.findByIdAndUpdate(id, {refreshToken: null});
      resolve({
        status: "Success",
        message: "Logged out successfully"
      })
    }catch(err){
      reject(err);
    }
  })
}

module.exports = {
  register,
  login,
  logout
};
