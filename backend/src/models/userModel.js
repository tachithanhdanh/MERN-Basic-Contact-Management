const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: [true, "Email address already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);