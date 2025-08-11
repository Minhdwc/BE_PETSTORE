const authService = require("../services/auth.service");

const register = async(req, res)=>{
    try{
        const data = req.body;
        const response = await authService.register(data);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const login = async(req, res)=>{
    try{
        const data = req.body;
        const response = await authService.login(data.email, data.password);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const logout = async(req, res)=>{
    try{
        const id = req.params.id;
        const response = authService.logout(id);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    register,
    login,
    logout
}