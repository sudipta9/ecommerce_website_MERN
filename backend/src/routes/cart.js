const express = require("express");
const { addItemToCart } = require("../controllers/cart");
const { requireSignin, userAccess } = require("../middleware");
const router = express.Router();

router.post("/user/cart/add-to-cart", requireSignin, userAccess, addItemToCart);

module.exports = router;
