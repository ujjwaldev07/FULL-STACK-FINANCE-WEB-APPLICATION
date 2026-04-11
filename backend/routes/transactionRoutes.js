const express = require("express");
const {
  addTransaction,
  getDashboardSummary,
  getMonthlyAnalytics,
  getTransactions,
} = require("../controllers/transactionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.get("/summary", protect, getDashboardSummary);
router.get("/analytics/monthly", protect, getMonthlyAnalytics);

module.exports = router;
