const category = require("../models/category");
const slugify = require("slugify");

// function to add category
exports.addCategory = (req, res) => {
  const categoryObject = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryObject.parentId = req.body.parentId;
  }
  const categories = new category(categoryObject);
  categories.save((error, category) => {
    if (error)
      return res.status(400).json({
        error: error,
      });
    if (category) {
      return res.status(200).json({ category: category });
    }
  });
};

exports.getCategories = (req, res) => {
  category.find({}).exec((error, categories) => {
    if (error)
      return res.status(400).json({
        error: error,
      });
    if (categories) {
      res.status(200).json({
        categories,
      });
    }
  });
};
