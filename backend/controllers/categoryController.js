const Category = require("../models/Category");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ user: req.user._id }).sort({
      type: 1,
      name: 1,
    });
    return res.status(200).json({ categories });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getCategories };
