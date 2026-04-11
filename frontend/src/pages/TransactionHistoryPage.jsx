import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import TransactionTable from "../components/TransactionTable";
import { fetchCategories } from "../services/categoryService";
import { fetchTransactions } from "../services/transactionService";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import PageTransition from "../components/ui/PageTransition";

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "" });
  const [loading, setLoading] = useState(true);

  const loadHistory = async (page = 1, activeFilters = filters) => {
    setLoading(true);
    try {
      const [categoriesResponse, transactionsResponse] = await Promise.all([
        fetchCategories(),
        fetchTransactions({ ...activeFilters, page, limit: 12 }),
      ]);
      setCategories(categoriesResponse.categories);
      setTransactions(transactionsResponse.transactions);
      setPagination(transactionsResponse.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory(1, filters);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    loadHistory(1, filters);
  };

  if (loading) {
    return (
      <div className="center-screen">
        <Loader lines={8} />
      </div>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <section className="page">
        <div className="page-header">
          <h2>Transaction History</h2>
          <p className="muted">Detailed ledger with filtering controls and pagination.</p>
        </div>
        <Card>
          <form className="filters" onSubmit={handleFilterSubmit}>
            <select className="field-input" name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input className="field-input" type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
            <input className="field-input" type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
            <Button type="submit">Apply</Button>
          </form>
        </Card>
        <Card>
          <TransactionTable transactions={transactions} />
          <div className="pagination">
            <Button type="button" variant="ghost" disabled={pagination.page <= 1} onClick={() => loadHistory(pagination.page - 1, filters)}>
              Previous
            </Button>
            <span>
              Page {pagination.page} of {pagination.pages || 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              disabled={pagination.page >= pagination.pages}
              onClick={() => loadHistory(pagination.page + 1, filters)}
            >
              Next
            </Button>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
};

export default TransactionHistoryPage;
