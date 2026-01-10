import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.";
import { useNavigate , Link} from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email }); 
    navigate("/");    
  };

  return (
    <div className="login-container">
        <div className="login-header">
            <h1>Activity Tracker</h1>
            <p>Login to access your activities</p>
        </div>
        <div className="login-card">
            <h2 className="login-title">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="login-form">
            <label>Email</label>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label>Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit" className="login-btn">
                Login
            </button>
            </form>
            <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    </div>
  );
}
