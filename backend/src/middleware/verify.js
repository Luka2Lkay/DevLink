const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/auth_key_config");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    const verified = jwt.verify(token.split(" ")[1], secretKey.key);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { verifyToken };
