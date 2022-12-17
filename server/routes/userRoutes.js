const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  usersList,
} = require("../controllers/userController");
const { routeProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", routeProtect, usersList);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", routeProtect, getMe);

module.exports = router;
