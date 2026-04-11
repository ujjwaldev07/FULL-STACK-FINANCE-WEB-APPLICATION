const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");

const addTransaction = async (req, res, next) => {
  try {
    const { type, amount, categoryId, date, note } = req.body;

    if (!type || !amount || !categoryId || !date) {
      res.status(400);
      throw new Error("Type, amount, category and date are required");
    }

    const category = await Category.findOne({
      _id: categoryId,
      user: req.user._id,
      type,
    });

    if (!category) {
      res.status(404);
      throw new Error("Category not found for selected transaction type");
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount: Number(amount),
      category: category._id,
      date,
      note: note || "",
    });

    return res.status(201).json({ transaction });
  } catch (error) {
    return next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const { category, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = { user: req.user._id };

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.max(1, Number(limit));
    const skip = (pageNumber - 1) * pageSize;

    const [transactions, total] = await Promise.all([
      Transaction.find(query)
        .populate("category", "name type")
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      Transaction.countDocuments(query),
    ]);

    return res.status(200).json({
      transactions,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getDashboardSummary = async (req, res, next) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    const income = result[0]?.income || 0;
    const expenses = result[0]?.expenses || 0;

    return res.status(200).json({
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    });
  } catch (error) {
    return next(error);
  }
};

const getMonthlyAnalytics = async (req, res, next) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year + 1}-01-01`);

    const analytics = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" }, type: "$type" },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          type: "$_id.type",
          total: 1,
        },
      },
      { $sort: { month: 1 } },
    ]);

    const monthly = Array.from({ length: 12 }, (_, idx) => ({
      month: idx + 1,
      income: 0,
      expense: 0,
    }));

    analytics.forEach((item) => {
      const monthData = monthly[item.month - 1];
      monthData[item.type] = Number(item.total.toFixed(2));
    });

    return res.status(200).json({ year, monthly });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getDashboardSummary,
  getMonthlyAnalytics,
};
