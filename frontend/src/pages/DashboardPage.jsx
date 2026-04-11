import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionTable from "../components/TransactionTable";
import MonthlyChart from "../components/MonthlyChart";
import { fetchCategories } from "../services/categoryService";
import { fetchMonthlyAnalytics, fetchSummary, fetchTransactions } from "../services/transactionService";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import PageTransition from "../components/ui/PageTransition";

const DashboardPage = () => {
  const [summary, setSummary] = useState({ balance: 0, totalIncome: 0, totalExpenses: 0 });
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async (page = 1, activeFilters = filters) => {
    setLoading(true);
    setError("");
    try {
      const [summaryRes, categoryRes, transactionRes, analyticsRes] = await Promise.all([
        fetchSummary(),
        fetchCategories(),
        fetchTransactions({ ...activeFilters, page, limit: 8 }),
        fetchMonthlyAnalytics(new Date().getFullYear()),
      ]);
      setSummary(summaryRes);
      setCategories(categoryRes.categories);
      setTransactions(transactionRes.transactions);
      setPagination(transactionRes.pagination);
      setMonthlyData(analyticsRes.monthly);
    } catch (err) {
      const message = err.response?.data?.message || "Could not load dashboard";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard(1, filters);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (event) => {
    event.preventDefault();
    loadDashboard(1, filters);
  };

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    loadDashboard(newPage, filters);
  };

  if (loading) {
    return (
      <div className="center-screen">
        <Loader lines={6} />
      </div>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <section className="page">
        <div className="page-header">
          <h2>Dashboard</h2>
          <p className="muted">Track income, expenses and monthly trend in one place.</p>
        </div>
        {error ? <p className="error">{error}</p> : null}
        <SummaryCards summary={summary} />

        <Card>
          <h3>Filter Transactions</h3>
          <form className="filters" onSubmit={applyFilters}>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
            <Button type="submit">Apply Filters</Button>
          </form>
        </Card>

        <MonthlyChart data={monthlyData} />

        <div className="dashboard-grid">
          <Card>
            <h3>Recent Transactions</h3>
            <TransactionTable transactions={transactions.slice(0, 5)} />
          </Card>
          <Card>
            <h3>Transaction History</h3>
            <TransactionTable transactions={transactions} />
          </Card>
        </div>
        <Card>
          <div className="pagination">
            <Button type="button" variant="ghost" onClick={() => goToPage(pagination.page - 1)} disabled={pagination.page <= 1}>
              Previous
            </Button>
            <span>
              Page {pagination.page} of {pagination.pages || 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => goToPage(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
            >
              Next
            </Button>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
};

export default DashboardPage;
