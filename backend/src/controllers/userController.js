const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @route POST api/users/register
 * @apiName registerUser
 * @description Register user
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const userInDb = await User.findOne({ username }); // pass the username to find the user
  if (userInDb) {
    res.status(400);
    throw new Error("User already exists");
  }
  const emailInDb = await User.findOne({ email }); // pass the email to find the user
  if (emailInDb) {
    res.status(400);
    throw new Error("Email already used");
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ username, email, password: hashedPassword });
  if (user) {
    console.log("User created", user);
    res
      .status(201)
      .json({ id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @route POST api/users/login
 * @apiName loginUser
 * @description Login user
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const user = await User.findOne({ username });
  // if user is not found
  if (!user) {
    res.status(401);
    throw new Error("Invalid username");
  }
  // if user is found, compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // if password is correct, create a token
    // jwt.sign(payload, secret, options)
    // payload: data to be stored in the token
    const token = jwt.sign(
      { user: { id: user.id, username: user.username, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: "60m" } // expires in 60 minutes
    );
    res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 60 * 60) });
    res.status(200).json({ status: "success", token });
  } else {
    res.status(401);
    throw new Error("Invalid password");
  }
});

/**
 * @route GET api/users/profile
 * @apiName getUserProfile
 * @description Get user profile
 * @access private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

/**
 * @route GET api/users/logout
  * @apiName logoutUser
  * @description Logout user
  * @access private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
