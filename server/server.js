require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const dbURI = process.env.dbURI;

//Connect to MongoDB
mongoose.connect(`${dbURI}`, () => console.log("Connected to MongoDB. Link: " + dbURI));

//Serve static files from the current directory & Middleware
app.use(express.static(__dirname));
app.use(express.json());

//Paths Import
const authRoute = require("./Routes/Auth");
const testRoute = require("./Routes/Testing");

//Path initialization
app.use("/auth", authRoute);
app.use("/testing", testRoute);

//Receive post request on the /api route
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



//Listen on the port
app.listen(port, function () {
  console.log("Server started on port " + port);
});
