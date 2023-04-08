const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

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
        // maxLength: [23, "6 Char"] 
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

// Encript password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        return next()
    }
    // hash password    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

})


const User = mongoose.model("User", userSchema)
module.exports = User