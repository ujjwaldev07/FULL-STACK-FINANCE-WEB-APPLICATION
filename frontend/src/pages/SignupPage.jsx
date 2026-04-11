import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import PageTransition from "../components/ui/PageTransition";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await signup(form.name, form.email, form.password);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
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
          <p className="kicker">Get started</p>
          <h2>Create your account</h2>
          <p className="muted">Set up your finance workspace in less than a minute.</p>
          <form className="form-grid" onSubmit={handleSubmit}>
            {error ? <p className="error">{error}</p> : null}
            <Input id="name" label="Full name" name="name" type="text" value={form.name} onChange={handleChange} required />
            <Input id="email" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Input
              id="password"
              label="Password"
              name="password"
              type="password"
              minLength={6}
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={loading}>
              <FiArrowRight />
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </Card>
      </main>
    </PageTransition>
  );
};

export default SignupPage;
