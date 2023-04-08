const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"]

    },
    email: {
        type: String,
        require: [true, "Please add a email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "6 Char"],
        maxLength: [23, "6 Char"] 
    },
    photo: {
        type: String,
        required: [true, "Please add a password"],
        default: "https://www.google.com"
    },
    phone: {
        type: String,
        default: "+91"
    },
    bio: {
        type: String,
        maxLength: [200, "200 Char"],
        default: "bio"
    }

},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User