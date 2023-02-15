const express = require("express");
const router = express.Router();
const authenticateToken = require("../Helper/authenticateToken");
const { returnStationInfo, updateStationInfo } = require("../Helper/stationFunctions");
const { isAvailable, addQueuer, returnWholeQueue } = require("../Helper/stationQueue");
const { returnUserInfo, updateUserInfo } = require("../Helper/userFunctions");

router.get("/", authenticateToken, async (req, res) => {
  // Get user information from DB
  const user = await returnUserInfo(req.user.username);

  // Exclude password from response (Safety)
  user.password = undefined;

  // Send back user information
  res.json(user);
});

router.post("/usestation", authenticateToken, async (req, res) => {
  // Get user information from DB
  const user = await returnUserInfo(req.user.username);
  const { stationId } = req.body;

  //Ensure station exists
  const station = await returnStationInfo(stationId);
  if (!station) return res.status(400).json({ type: "failure", message: "Station does not exist!" });

  // Guard Clause: Ensure station has battery and noone is using it currently
  if (station.count <= 0)
    return res.status(400).json({ type: "failure", message: "Station is out of batteries!" });

  

  if (!isAvailable(stationId))
    return res.status(400).json({ type: "failure", message: "Station is currently in use!" });

  console.log(returnWholeQueue());
  // Add user to queue
  addQueuer(user.username, stationId);

  console.log(returnWholeQueue());


  // Use one battery from the station and save to DB
  station.count --;
  const savedStation = await updateStationInfo(station);

  // Send back user information
  res.status(200).json({ type: "success", message: "Thank you for using our service! + 5 points" });
})

module.exports = router;
