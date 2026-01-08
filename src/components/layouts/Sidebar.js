import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaHome, FaTasks, FaUsers } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">ActivityApp</h2>
      <NavLink to="/" className="nav"> <FaHome className="icon" /><span> Dashboard</span></NavLink>
      <NavLink to="/activity" className="nav"><FaTasks className="icon" /><span>Activity</span></NavLink>
      <NavLink to="/users" className="nav"><FaUsers className="icon" /><span>Users</span></NavLink>
    </aside>
  );
}
