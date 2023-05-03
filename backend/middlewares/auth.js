const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Check whether the user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  //   console.log("Sujan", token);

  if (!token) {
    return next(new ErrorHandler("Login first to access this resoource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  req.user = await User.findById(decoded.id);
  // console.log("Sujan",req.user)
  next();
});

// Handling user roles
exports.authorizeUserRoles = (...roles) => {
  return (req, res, next) => {
    // console.log("Next Sujan",req.user)
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      )
    }
    next()
  };
};
