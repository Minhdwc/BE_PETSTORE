const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async()=>{
    try{
        const connectionInsatance = await mongoose.connect(`${process.env.DATABASE_URL}`)
        console.log(`Database connected successfully: ${connectionInsatance.connection.name}`);
    }catch(error){
        console.error("Database connection error:", error);;
    }
}

module.exports = connectDB;