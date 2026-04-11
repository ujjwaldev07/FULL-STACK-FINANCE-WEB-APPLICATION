const Category = require("../models/Category");

const defaultCategories = [
  { name: "Salary", type: "income" },
  { name: "Freelance", type: "income" },
  { name: "Investments", type: "income" },
  { name: "Food", type: "expense" },
  { name: "Travel", type: "expense" },
  { name: "Bills", type: "expense" },
  { name: "Entertainment", type: "expense" },
  { name: "Healthcare", type: "expense" },
  { name: "House rent", type: "expense"}
];

const seedDefaultCategories = async (userId) => {
  const docs = defaultCategories.map((item) => ({ ...item, user: userId }));
  await Category.insertMany(docs, { ordered: false }).catch(() => undefined);
};

module.exports = seedDefaultCategories;
