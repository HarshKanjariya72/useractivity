import "./Dashboard.css";
import { FaListAlt, FaCheckCircle, FaClock, FaExclamationTriangle,FaSignOutAlt, FaRegUser } from "react-icons/fa";

export default function Dashboard({ activities }) {
  const total = activities.length;
  const completed = activities.filter(a => a.completed).length;
  const pending = total - completed;
  const high = activities.filter(a => a.priority === "High").length;
   const handleLogout = () => {
    alert("Logged out successfully");
  };

  return (
    <div className="page">
      <div className="dashboard-navbar">
        <div className="nav-left">
          <h3>Activity Dashboard</h3>
        </div>
        <div className="nav-right">
          <span className="nav-user"><FaRegUser /> User</span>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="cards">
        <div className="card blue">
          <div className="card-icon"><FaListAlt /></div>
          <div><p>Total Activity</p><h3>{total}</h3></div>
        </div>
        <div className="card green">
          <div className="card-icon"><FaCheckCircle /></div>
          <div>
            <p>Completed</p>
            <h3>{completed}</h3>
          </div>
        </div>
        <div className="card orange">
          <div className="card-icon"><FaClock /></div>
          <div>
            <p>Pending</p>
            <h3>{pending}</h3>
          </div>
        </div>
        <div className="card red">
          <div className="card-icon"><FaExclamationTriangle /></div>
          <div>
            <p>High Priority</p>
            <h3>{high}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
