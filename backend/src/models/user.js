// const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    userName: {
      type: String,
      // required: true,
      trim: true,
      min: 3,
      max: 16,
      unique: true,
      index: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // validate: validator.isEmail,
    },

    HashPassword: {
      type: String,
      required: true,
      unique: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      unique: false,
    },

    MobileNumber: {
      type: String,
      // required: true,
      // unique: true,
      min: 10,
      max: 10,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.HashPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: function () {
    return bcrypt.compareSync(password, this.HashPassword);
  },
};
module.exports = mongoose.model("User", userSchema);
