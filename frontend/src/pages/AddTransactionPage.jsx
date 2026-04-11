import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { fetchCategories } from "../services/categoryService";
import { createTransaction } from "../services/transactionService";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import PageTransition from "../components/ui/PageTransition";

const AddTransactionPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    categoryId: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.categories);
      } catch (err) {
        const message = err.response?.data?.message || "Unable to load categories";
        setError(message);
        toast.error(message);
      }
    };
    loadCategories();
  }, []);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === form.type),
    [categories, form.type]
  );

  useEffect(() => {
    if (!filteredCategories.find((item) => item._id === form.categoryId)) {
      setForm((prev) => ({ ...prev, categoryId: filteredCategories[0]?._id || "" }));
    }
  }, [filteredCategories, form.categoryId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createTransaction(form);
      toast.success("Transaction added successfully");
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add transaction";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <section className="page narrow">
        <Card className="glass-card">
          <h2>Add Transaction</h2>
          <p className="muted">Capture your latest income or expense with accurate category tagging.</p>
          {error ? <p className="error">{error}</p> : null}
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Type
              <select className="field-input" name="type" value={form.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>
            <Input
              id="amount"
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={form.amount}
              onChange={handleChange}
              required
            />
            <label>
              Category
              <select className="field-input" name="categoryId" value={form.categoryId} onChange={handleChange} required>
                {filteredCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <Input id="date" label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
            <label>
              Note
              <textarea className="field-input" name="note" rows="3" value={form.note} onChange={handleChange} />
            </label>
            <Button type="submit" disabled={loading || !categories.length}>
              {loading ? "Saving..." : "Add Transaction"}
            </Button>
          </form>
          {!categories.length ? <Loader lines={2} /> : null}
        </Card>
      </section>
    </PageTransition>
  );
};

export default AddTransactionPage;
