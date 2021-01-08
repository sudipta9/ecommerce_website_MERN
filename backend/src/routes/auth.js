const express = require("express");
const { signup, signin } = require("../controllers/auth");
const {
  validateSignupInput,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupInput, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

module.exports = router;
