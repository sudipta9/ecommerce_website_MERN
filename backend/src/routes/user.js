const { request, response } = require("express");
const express = require("express");
const { signup } = require("../controllers/user");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;
