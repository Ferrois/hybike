const express = require("express");
const router = express.Router();
const authenticateToken = require("../Helper/authenticateToken");
const { returnUserInfo, updateUserInfo } = require("../Helper/userFunctions");

router.post("/modifystat", authenticateToken, async (req, res) => {
    // Get the user information from DB
    const user = await returnUserInfo(req.user.username);
    const { stationId, count } = req.body;
    
    // Guard Clause: Ensure user is admin
    if (!user.isAdmin) return res.status(401).json({ type: "failure", message: "You are not an admin!" });
    
    // Ensure station exists
    const station = await returnStationInfo(stationId);
    if (!station) return res.status(400).json({ type: "failure", message: "Station does not exist!" });

    // Modify station count and save to DB
    station.count = count;
    const savedStation = await updateStationInfo(station);

    // Send back user information
    res.status(200).json({ type: "success", message: "Station count modified!" });
})


module.exports = router;
