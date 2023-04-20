const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let userId;

  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      userId = result.id;
    }
  });
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = { id: userId };
  next();
};

module.exports = verifyJwt;