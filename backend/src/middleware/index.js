const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);
    req.user = user;
  } else
    return res.status(400).json({
      massage: "Authorization Failed",
    });
  next();
};

exports.userAccess = (req, res, next) => {
  if (req.user.role != "user") {
    return res.status(400).json({
      massage: "only users can Access this",
    });
  }
  next();
};

exports.adminAccess = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(400).json({
      massage: "only admin can Access this",
    });
  }
  next();
};
