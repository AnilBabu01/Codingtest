const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "anilbabu$oy";
// Register a user
exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(401).json({
        status: false,
        msg: "Sorry a user with this email already exists",
      });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: errors.array() });
    }
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    user = await User.create({
      name: name,
      email: email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({
      status: true,
      msg: "You have register Successully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: errors.array() });
    }
    const { email, password } = req.body;

    // Finding user in database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        status: false,
        msg: "Please try to login with correct credentials",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({
      status: true,
      msg: "You have login Successully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error, "internal server error");
  }
};
