import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import PageTransition from "../components/ui/PageTransition";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <main className="auth-page">
        <Card className="auth-card glass-card">
          <p className="kicker">Secure access</p>
          <h2>Welcome back</h2>
          <p className="muted">Sign in to manage your cashflow and track spending patterns.</p>
          <form onSubmit={handleSubmit} className="form-grid">
            {error ? <p className="error">{error}</p> : null}
            <Input
              id="email"
              label="Email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={loading}>
              <FiArrowRight />
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
          <div className="auth-meta">
            <span>
              <FiMail /> Verified email login
            </span>
            <span>
              <FiLock /> Bank-grade auth
            </span>
          </div>
          <p>
            New user? <Link to="/signup">Create account</Link>
          </p>
        </Card>
      </main>
    </PageTransition>
  );
};

export default LoginPage;
