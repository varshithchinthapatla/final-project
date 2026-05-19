import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { saveAuth } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { data } = await API.post("/auth/login", form);

      saveAuth(data.token, data.user);

      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background"></div>

      <form className="auth-card glass" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to continue using Explain Like Friend AI</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}