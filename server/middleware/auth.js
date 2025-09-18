const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // token from header "Authorization: Bearer <token>"
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1]; // safe if header is empty

  if (!token) return res.status(401).json({ msg: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: '...' }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
