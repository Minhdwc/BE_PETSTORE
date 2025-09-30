const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../provider/jwt.service");


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
          message: "Vui lòng kiểm tra lại thông tin người dùng",
        });
      }

      const checkUser = await bcrypt.compare(password, user.password);
      if (!checkUser) {
        return reject({
          status: "Error",
          message: "Mật khẩu chưa chính xác",
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

// const refresh = (token)=>{
//   return new Promise(async(resolve, reject)=>{
//     try{
//       const decoded = jwt.decode(token);
//       const exp = decoded.exp * 1000;
//       if()
//     }catch(err){
//       reject(err)
//     }
//   })
// }

module.exports = {
  register,
  login,
  logout
};
