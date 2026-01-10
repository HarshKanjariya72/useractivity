import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Registered user:", email);

    setSuccess(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-container">

      {/* <div className="login-header">
        <h1>Activity Dashboard</h1>
        <p>Create your account</p>
      </div> */}

      
      <div className="login-card">
        <h2 className="login-title">Registration</h2>

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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}
        {success && (
          <p className="success-msg">
            Account created! <Link to="/login">Click here to login</Link>
          </p>
        )}

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
