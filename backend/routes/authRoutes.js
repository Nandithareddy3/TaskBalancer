const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// POST /api/auth/register - for user registration
router.post("/register", registerUser);

// POST /api/auth/login - for user login
router.post("/login", loginUser);

module.exports = router;
