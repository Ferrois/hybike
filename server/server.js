require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI = process.env.dbURI;

//Connect to MongoDB
mongoose.connect(`${dbURI}`, () =>
  console.log("Connected to MongoDB. Link: " + dbURI)
);

//Cors Middleware
app.use(
  cors({
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE"],
    credentials: true,
  })
);

//Serve static files from the current directory & Middleware
app.use(express.static(__dirname));
app.use(express.json());

//Paths Import
const authRoute = require("./Routes/Auth");
const testRoute = require("./Routes/Testing");
const apiRoute = require("./Routes/Api");
const userRoute = require("./Routes/User");
const adminRoute = require("./Routes/Admin")

//Path initialization
app.use("/auth", authRoute);
app.use("/testing", testRoute);
app.use("/api", apiRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute)

//Receive post request on the /api route
app.get("/ping", function (req, res) {
  console.log(req.body);
  res.send("pong");
});

//Listen on the port
app.listen(port, function () {
  console.log("Server started on port " + port);
});
