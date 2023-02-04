const express = require("express");
const router = express.Router();
const authenticateToken = require("../Helper/authenticateToken");
const { returnUserInfo } = require("../Helper/userFunctions");

router.get("/", authenticateToken, async (req, res) => {
  // Get user information from DB
  const user = await returnUserInfo(req.user.username);

  // Exclude password from response (Safety)
  user.password = undefined;

  // Send back user information
  res.json(user);
});

module.exports = router;
