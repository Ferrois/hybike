require("dotenv").config();
const jwt = require("jsonwebtoken");

function createJWT(username, expiry = "24h") {
  //Guard clauses
  if (username == null) return console.log("No username found");

  //Sign Token
  const accessToken = jwt.sign({ username: username }, process.env.SECRETKEY, {
    expiresIn: expiry,
  });
  return accessToken;
}

module.exports = createJWT;
