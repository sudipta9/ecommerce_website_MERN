const jwt = require("jsonwebtoken");

module.exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);
  req.user = user;
  next();
  // jwt.decode(token)
};
