const express = require("express")
const { registerUser, LoginUser } = require("../controllers/userControllers")
const router =  express.Router();


// Routes
router.post("/register", registerUser);
router.post("/login", LoginUser);
// Routes

module.exports = router;