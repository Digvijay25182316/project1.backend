const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getOneUser,
  deleteUser,
  updateUserRole,
} = require("../controller/userController");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth.js");

const router = express.Router();

router.route("/register").post(isAuthenticated, authorizeAdmin, registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeAdmin, getOneUser)
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

module.exports = router;
