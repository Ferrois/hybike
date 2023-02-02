require("dotenv").config();
const express = require("express");
const app = express();
//var path = require('path');
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const dbURI = process.env.dbURI;
const UserSchema = require("./Models/user");

mongoose.connect(`${dbURI}`, () => console.log("Connected to MongoDB. Link: " + dbURI));

// serve static files from the current directory
app.use(express.static(__dirname));
app.use(express.json());

//receive post request on the /api route
app.get("/ping", function (req, res) {
  console.log(req.body);
  res.send("pong");
});

app.post("/batt", async (req, res) => {
  if (!req) return res.send("No request found");
  const { used, id } = req.body;
  console.log(used, id);
  res.send("Received");
});

app.get("/api", function (req, res) {
  console.log(req.body);
});

app.post("/register", async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  const existingUser = await UserSchema.find({ username: username }).exec();
  console.log(existingUser);
  if (existingUser.length != 0) return res.status(400).send("User already exists!")
  const user = new UserSchema({ username, password });
  console.log(user)
  const savedUser = await user.save();
  res.status(200).send("Success!");
});

app.post("/login", async(req, res) => {
  const { username, password } = req.body;
  const existingUser = await UserSchema.find({ username: username }).exec();
  if (existingUser.length == 0) return res.status(401).send("User does not exist!");
  if (existingUser[0].password != password) return res.status(401).send("Incorrect password!");
  res.status(200).send("Success!");
})

// start the server
app.listen(port, function () {
  console.log("Server started on port " + port);
});
