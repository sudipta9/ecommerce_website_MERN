const express = require("express");
const router = express.Router();
const { addCategory, getCategories } = require("../controllers/category");
const { requireSignin, adminAccess } = require("../middleware");

router.post("/category/create", requireSignin, adminAccess, addCategory);
router.get("/category/get-category", getCategories);

module.exports = router;
