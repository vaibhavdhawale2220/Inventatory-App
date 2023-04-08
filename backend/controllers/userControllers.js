const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

// Generate token
const generateToken =  (id) => { 
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:"1d"})
     }

//  Register User
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body

    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all the fields");
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be upto 6 char");
    }

    const userExist = await User.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist!");
    }


    // Create New User
    const user = await User.create({
        name,
        email,
        password,
    })

    
    //  generate token call function
    const token = generateToken(user._id)

    // send http-cookie token to save token in cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true
    });


    //  json response in postman
    if(user) {
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
            token
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
});

// Login User
const LoginUser = asyncHandler(async (req, res) => {
    const {email, password} =req.body
 
    // Validate
    if (!email || !password) {
        res.status(400);
        throw new Error("Plaease add email and password")
    }

    //  Check if user exist
    const user = await User.findOne({email})

    if (!user) {
        res.status(400);
        throw new Error("user not found, please signup")
    }

    // User exist
    const passwordIsCorrect = await bcrypt.compare(password, user.password)
    
    if(user && passwordIsCorrect) {
        const {_id, name, email, photo, phone, bio} = user
        res.status(200).json({ 
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password")
    }
     
});

module.exports = {
    registerUser,
    LoginUser,
};