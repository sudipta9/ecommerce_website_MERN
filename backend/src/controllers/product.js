const Product = require("../models/products");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  //   res.status(200).json({
  //     file: req.files,
  //     body: req.body,
  //   });

  const {
    name,
    price,
    qty,
    description,
    offer,
    category,
    seller,
    offerPrice,
  } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    qty,
    description,
    productPictures,
    offer,
    category,
    seller: req.user._id,
    offerPrice,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(200).json({ product });
    }
  });
};
