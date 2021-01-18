const User = require("../../models/user");
const jwt = require("jsonwebtoken");

// signup function
exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    // check email already exits
    if (user && user.role === "admin") {
      return res.status(400).json({
        massage: "Admin already registered!",
      });
    }

    // is email not registered
    const { firstName, lastName, email, password, userName, role } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
      role: "admin",
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          massage: `${error}`,
        });
      }
      if (data) {
        return res.status(201).json({
          user: data,
        });
      }
    });
  });
};

// login function
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    // if some error
    if (error)
      return res
        .status(400)
        .json({ massage: "Something went wrong", error: `${error}` });
    // if email found in the database
    if (user) {
      // check whether the password matched or not
      if (user.authenticate(req.body.password) && user.role === "admin") {
        // generate login token
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JSONWEBTOKEN_SECRET_KEY,
          { expiresIn: "3d" }
        );

        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "3d" });
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      }
      // if password not matched
      else {
        if (user.role != "admin") {
          return res.status(400).json({
            massage:
              "You are not registered as an admin please sign up for an admin and try agin!",
          });
        } else
          return res.status(400).json({
            massage: "please enter valid password",
            error: `${error}`,
          });
      }
    }
    // if email not found in the database
    if (!user)
      return res.status(400).json({
        massage: "email not registered",
        error: `${error}`,
      });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signed out successfully",
  });
};
