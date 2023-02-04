const express = require("express");
const router = express.Router();
const authenticateToken = require("../Helper/authenticateToken");

router.get("/", authenticateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;