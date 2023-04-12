const jwt = require("jsonwebtoken");

const verifyJwt = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  let userId;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      userId = result.id;
    }
  });

  if (userId === null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return userId;
};

module.exports = verifyJwt;
