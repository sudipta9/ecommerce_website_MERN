const express = require("express");
const { initialData } = require("../../controllers/admin/initial.Data");
const router = express.Router();

router.post("/initial-data/", initialData);

module.exports = router;
