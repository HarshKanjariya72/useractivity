import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">ActivityApp</h2>

      <NavLink to="/" className="nav">Dashboard</NavLink>
      <NavLink to="/activity" className="nav">Activity</NavLink>
      <NavLink to="/users" className="nav">Users</NavLink>
    </aside>
  );
}
