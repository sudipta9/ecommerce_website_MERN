const category = require("../models/category");
const slugify = require("slugify");

// recursive function to organize parent and child categories
createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category)
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  return categoryList;
};

// function to add category
exports.addCategory = (req, res) => {
  const categoryObject = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryObject.categoryImage =
      `${process.env.API}/public/` + req.file.filename;
  }

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

// fetch the categories
exports.getCategories = (req, res) => {
  category.find({}).exec((error, categories) => {
    if (error)
      return res.status(400).json({
        error: error,
      });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({
        categoryList,
      });
    }
  });
};
