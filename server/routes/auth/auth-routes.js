const express = require("express");
const {
  registerUserController,
  loginUserController,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/authController");

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User is authenticated",
    user,
  });
});

module.exports = router;
