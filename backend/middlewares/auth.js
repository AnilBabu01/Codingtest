const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "anilbabu$oy";

// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  var token = req.headers.authorization;
  token = token.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      Success: false,
      msg: "Login first to access this resource",
    });
  }

  const data = jwt.verify(token, JWT_SECRET);
  req.user = data.user;
  next();
};
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        Success: false,
        msg: `Role (${req.user.role}) is not allowed to acccess this resource`,
      });
    }
    next();
  };
};
