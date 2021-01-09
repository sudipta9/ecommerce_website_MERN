const express = require("express");
const { createProduct } = require("../controllers/product");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const { requireSignin, adminAccess } = require("../middleware");

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
  "/product/create",
  requireSignin,
  adminAccess,
  upload.array("productPicture"),
  createProduct
);

//router.get("/category/get-category", getCategories);

module.exports = router;
