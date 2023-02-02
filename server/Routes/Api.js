const express = require("express");
const router = express.Router();
const locationData = require("../Assets/locations.json");
const StationSchema = require("../Models/station");

router.get("/stat", async (req, res) => {
  // Read database for real-time station data
  const stationData = await StationSchema.find({}).exec();

  // Map over the location data and add the station data to it
  const response = locationData.map((location) => {
    const defaultStation = { id: location.id, count: 0, capacity: 0 };
    const station = stationData.find((station) => station.id == location.id) || defaultStation;
    return {
      id: station.id,
      count: station.count,
      capacity: station.capacity,
      name: location.name,
      loc: location.loc,
    };
  });

  // Send response
  res.json(response);
});

router.put("/stat", async (req, res) => {
  // Destructure request body
  const { id, count } = req.body;

  // Check that station exists & guard clause
  const existingStation = locationData.find((station) => station.id == id);
  if (!existingStation)
    return res.status(401).json({
      type: "failure",
      message: "Station does not exist in database!",
    });

  // Update the count of the station with the given id
  StationSchema.findOneAndUpdate({ id }, { count: count }, (err, doc) => {
    if (err) {
      res.json({ type: "failure", message: "Error" });
    } else {
      res.json({ type: "success", message: "Updated" });
    }
  });
});

router.post("/stat", async (req, res) => {
  // Destructure request body
  const { id, count, capacity } = req.body;

  // Create new Station
  const station = new StationSchema({ id, count, capacity });

  // Save Station to Database
  try {
    const savedStation = await station.save();

    // Send status
    const message = "Station successfully registered!";
    res.status(200).json({ type: "success", savedStation, message });
  } catch (err) {
    res.status(400).json({ type: "failure", message: err });
  }
});

module.exports = router;
