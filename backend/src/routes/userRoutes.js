const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", validateTokenHandler, getUserProfile);

module.exports = router;