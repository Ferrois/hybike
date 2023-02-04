const UserSchema = require("../Models/user");
const express = require("express");
const router = express.Router();
const createJWT = require("../Helper/createJWT");

router.post("/register", async (req, res) => {
  // Destructure request body
  const { username, password } = req.body;

  // Check that user does not exist
  const existingUser = await UserSchema.find({ username: username }).exec();
  if (existingUser.length != 0)
    return res
      .status(400)
      .json({ type: "failure", message: "User already exists!" });

  // Guard clauses
  if (username.length < 5)
    return res
      .status(400)
      .json({ type: "failure", message: "Username must be at least 5 characters!" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ type: "failure", message: "Password must be at least 8 characters!" });
  if (username.includes(" "))
    return res
      .status(400)
      .json({ type: "failure", message: "Username cannot contain spaces!" });

  // Create new User
  const user = new UserSchema({ username, password });

  // Save User to Database
  const savedUser = await user.save();

  // Send back JWT token and status
  const accessToken = createJWT(username);
  const message = "User successfully registered!";
  res.status(200).json({ type: "success", savedUser, accessToken, message });
});

router.post("/login", async (req, res) => {
  // Destructure request body
  const { username, password } = req.body;

  // Check that user exists
  const existingUser = await UserSchema.find({ username: username }).exec();

  //Guard clauses
  if (existingUser.length == 0)
    return res.status(401).json({ type: "failure", message: "User does not exist!" });
  if (existingUser[0].password != password)
    return res.status(401).json({ type: "failure", message: "Incorrect password!" });

  // Send back JWT token and status
  const accessToken = createJWT(username);
  const message = "User successfully logged in!";
  res.status(200).json({ type: "success", accessToken, message });
});

module.exports = router;
