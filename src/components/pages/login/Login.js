import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length === 0) {
        setError("Invalid email or password");
        return;
      }

      login(data[0]);

      navigate("/", { replace: true });
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Activity Tracker</h1>
        <p>Login to access your activities</p>
      </div>

      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-link">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
