const express = require("express");
const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controllers/userController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", validateTokenHandler, getUserProfile);

router.get("/logout", validateTokenHandler, logoutUser);

module.exports = router;