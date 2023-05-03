const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfiles,
  updatePassword,
  updateProfiles,
  allUsers,
  specificUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizeUserRoles,
} = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);
userRouter.post("/password/forgot", forgotPassword);
userRouter.put("/password/reset/:token", resetPassword);
userRouter.get("/me", isAuthenticatedUser, getUserProfiles);
userRouter.put("/password/update", isAuthenticatedUser, updatePassword);
userRouter.put("/me/update", isAuthenticatedUser, updateProfiles);

userRouter.get("/logout", logoutUser);

userRouter.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  allUsers
);
userRouter.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  specificUser
);
userRouter.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  updateUser
);
userRouter.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  deleteUser
);

module.exports = userRouter;
