const express = require("express");
const { returnStationInfo, updateStationInfo } = require("../Helper/stationFunctions");
const { isAvailable, returnQueuer, removeQueuer } = require("../Helper/stationQueue");
const { returnUserInfo, updateUserInfo } = require("../Helper/userFunctions");
const router = express.Router();
// const authenticateToken = require("../Helper/authenticateToken");
// const { returnUserInfo, updateUserInfo } = require("../Helper/userFunctions");

router.post("/",  async (req, res) => {
    const { stationId } = req.body;
    if (isAvailable(stationId)) return res.status(200).json({ type: "success", message: "Pong" });
    const {username} = returnQueuer(stationId);
    return res.status(200).json({ type: "request" , message:`${username} is requesting the station`})
})

router.post("/accept", async (req, res) => {
    const { stationId } = req.body;
    if (isAvailable(stationId)) return res.status(200).json({ type: "failure", message: "There was no request" });
    const {username} = returnQueuer(stationId);
    removeQueuer(username, stationId);

    const station = await returnStationInfo(stationId);
    station.count --;
    const savedStation = await updateStationInfo(station);

    const user = await returnUserInfo(username);
    user.points += 5;
    const savedUser = await updateUserInfo(user);

    res.status(200).json({type:"success", message: "Request Completed Successfully"})
})


module.exports = router;