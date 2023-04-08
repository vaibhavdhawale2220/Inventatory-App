const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const generateToken =  (id) => { 
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:"1d"})
     }

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

    
    //  generate token
    const token = generateToken(user._id)


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
    // Create New User
    

});

module.exports = {
    registerUser,
};