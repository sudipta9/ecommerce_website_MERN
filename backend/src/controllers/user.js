const User = require("../models/user");

module.exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    // check email already exits or not
    if (user)
      return res.status(400).json({
        massage: "user already registered!",
      });

    // is email not registered go for sign up
    const { firstName, lastName, email, password, userName, role } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
      role,
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
