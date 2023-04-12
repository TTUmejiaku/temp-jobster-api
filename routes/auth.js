const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const rateLimiter = require("express-rate-limit");
const { register, login, updateUser } = require("../controllers/auth");

const apiLimit = rateLimiter({
  windowMS: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimit, register);
router.post("/login", apiLimit, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
