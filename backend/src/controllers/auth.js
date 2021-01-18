const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// signup function
module.exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    // check email already exits
    if (user) {
      return res.status(400).json({
        massage: "user already registered!",
      });
    }

    // is email not registered
    const { firstName, lastName, email, password } = req.body;
    HashPassword = await bcrypt.hash(password, 16);
    const _user = new User({
      firstName,
      lastName,
      email,
      HashPassword,
      userName: Math.random().toString(),
      role: "user",
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
module.exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    // if some error
    if (error)
      return res
        .status(400)
        .json({ massage: "Something went wrong", error: `${error}` });
    // if email found in the database
    if (user) {
      // check whether the password matched or not
      if (user.authenticate(req.body.password)) {
        // generate login token
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JSONWEBTOKEN_SECRET_KEY,
          { expiresIn: "1d" }
        );

        const { _id, firstName, lastName, email, role, fullName } = user;
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
      else
        return res.status(400).json({
          massage: "please enter valid password",
          error: `${error}`,
        });
    }
    // if email not found in the database
    if (!user)
      return res.status(400).json({
        massage: "email not registered",
        error: `${error}`,
      });
  });
};
