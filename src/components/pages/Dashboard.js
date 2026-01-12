import "./Dashboard.css";
import { FaListAlt, FaCheckCircle, FaClock, FaExclamationTriangle,FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.";
import { useActivities } from "../../context/ActivityContext";
import { useNavigate } from "react-router-dom";


const API_URL ="http://localhost:3001/activities";


export default function Dashboard() {
  const {activities, loading} = useActivities();
  const total = activities.length;
  const completed = activities.filter(a => a.completed).length;
  const pending = total - completed;
  const high = activities.filter(a => a.priority === "High").length;
  
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  if (loading) return <p>Loading...</p>;


  return (
    <div className="page">
      <div className="dashboard-navbar">
        <div className="nav-left">
          <h3>Activity Dashboard</h3>
        </div>
        <div className="nav-right">
          {user && (
            <>
              <span className="nav-user">
                <FaRegUser /> {user.email}
              </span>

              <button className="logout-btn" onClick={logout}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
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