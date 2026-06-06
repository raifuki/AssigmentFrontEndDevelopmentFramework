const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getMe,
} = require("../controllers/authController");

const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const {
  validateRequest,
} = require("../middleware/errorMiddleware");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.post(
  "/register",
  registerValidator,
  validateRequest,
  register
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  login
);

router.get(
  "/me",
  authMiddleware,
  getMe
);

module.exports = router;