const express = require("express");
const {
  registerUserController,
} = require("../../controllers/auth/authController");

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login");

module.exports = router;
