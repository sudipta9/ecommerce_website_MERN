const express = require("express");
const {
  validateSignupInput,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

const { signup, signin } = require("../../controllers/admin/auth");
const router = express.Router();

router.post("/admin/signup", validateSignupInput, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

module.exports = router;
