const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db.config");
const router = require("./routes/index.routes");

require("dotenv").config();

const app = express();

const corOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
connectDB();

app.use(cors(corOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
