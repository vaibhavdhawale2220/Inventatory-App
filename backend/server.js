const dotenv = require("dotenv").config();
const express =  require("express");
const mongoose = require( "mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const errorhandler = require("./middleWare/errorMiddleware")
const cookieparser = require("cookie-parser") 

const app = express()

// Middleware
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());
// Middleware

// Routes Middleware
app.use("/api/users", userRoute)
// Routes Middleware


// Routes
app.get("/", (req, res) => {
    res.send("Home page");
});
// Routes

// Error Middleware
app.use(errorhandler);
// Error Middleware

// Connect to monogDB & start server
const PORT =  process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
    })
})
.catch((err) => console.log(err))
// Connect to monogDB & start server
