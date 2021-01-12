const express = require("express");
const router = express.Router();
const { addCategory, getCategories } = require("../controllers/category");
const { requireSignin, adminAccess } = require("../middleware");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  adminAccess,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/get-category", getCategories);

module.exports = router;
