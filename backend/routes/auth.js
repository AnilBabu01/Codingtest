const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

router.post(
  "/regster",
  [
    body("name", "name must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  registerUser
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  loginUser
);

module.exports = router;
