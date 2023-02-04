const express = require("express");
const router = express.Router();
const authenticateToken = require("../Helper/authenticateToken");
const { returnUserInfo, updateUserInfo } = require("../Helper/userFunctions");

router.get("/", authenticateToken, async (req, res) => {
    // Get the user information from DB
    const user = await returnUserInfo(req.user.username);

    // Increment Points
    user.points ++;

    // Save the user information to DB
    const savedUser = await updateUserInfo(user);
    res.status(200).json(savedUser);
});

module.exports = router;