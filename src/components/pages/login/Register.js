import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "./login.css"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [name,setName]= useState();
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess(false);

  //   if (!email || !password || !confirmPassword) {
  //     setError("All fields are required.");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   console.log("Registered user:", email);

  //   setSuccess(true);
  //   setEmail("");
  //   setPassword("");
  //   setConfirmPassword("");
  // };
  const handleRegister = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name,email, password })
    });

    navigate("/login");
  };

  return (
    <div className="login-container">
      
      <div className="login-card">
        <h2 className="login-title">Registration</h2>

        <form onSubmit={handleRegister} className="login-form">
          <label>Name</label>
          <input placeholder="Username" value={name} onChange={e => setName(e.target.value)} required/>

          <label>Email</label>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />

          <label>Password</label>
          <input placeholder="Password" onChange={e => setPassword(e.target.value)} />
          
          <label>Confirm Password</label>
          <input placeholder="Password" onChange={e => setPassword(e.target.value)} />

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>



        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
