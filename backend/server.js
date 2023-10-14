const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/connectDB");
const filterRouter = require("./routes/filterRoutes");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

connectDB();

// Routes
app.use("/api", filterRouter);

// Home Route
app.get("/", (req,res) => {
    res.send({
        "success": true,
        "error_code": null,
        "message": "Server is Running 🎉",
        "data": null
    });
});

app.listen(process.env.PORT || 9000, ()=> {
    console.log("Server Started");
});