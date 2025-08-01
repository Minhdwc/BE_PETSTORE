//import libraries
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//import database connection
const connectDB = require('./config/db.config');

//import variables
require("dotenv").config();

const app = express();
//config cors
const corOptions = {
    origin: ["*"],
    credentials: true,
}
//connect to database
connectDB();
app.use(cors(corOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

const PORT = 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));