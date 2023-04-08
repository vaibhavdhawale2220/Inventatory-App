const express = require("express")
const { registerUser } = require("../controllers/userControllers")
const router =  express.Router();


// Routes
router.post("/register", registerUser);
// Routes

module.exports = router;