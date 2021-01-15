const express = require("express");
const {
  validateSignupInput,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");
const { requireSignin } = require("../../middleware");

const { signup, signin, signout } = require("../../controllers/admin/auth");
const router = express.Router();

router.post("/admin/signup", validateSignupInput, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/admin/signout", signout);

module.exports = router;
