const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/verify", verifyUser);

module.exports = router;
