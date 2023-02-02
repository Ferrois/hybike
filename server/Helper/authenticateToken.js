require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // if there isn't any token
  if (token == null) return res.sendStatus(401);

  // verify the token
  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
