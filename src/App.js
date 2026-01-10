import { Routes, Route ,useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/layouts/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Activity from "./components/pages/Activity";
import Users from "./components/pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/pages//login/Login";
import Register from "./components/pages/login/Register";

export default function App() {
  const [activities, setActivities] = useState([]);

  const addActivity = (activity) =>
    setActivities(prev => [...prev, activity]);

  const toggleActivity = (id) =>
    setActivities(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );

  const deleteActivity = (id) =>
    setActivities(prev => prev.filter(a => a.id !== id));
  const location = useLocation(); 
  const hideSidebar = location.pathname === "/login"|| location.pathname === "/register";

  return (
      <div className="app-layout" style={{ display: "flex" }}>
        {!hideSidebar && <Sidebar />}


        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register/>}/>
            <Route path="/" element={
              <ProtectedRoute> 
                <Dashboard activities={activities} />
              </ProtectedRoute>} 
            />
            <Route
              path="/activity"
              element={
                <Activity
                  activities={activities}
                  onAdd={addActivity}
                  onToggle={toggleActivity}
                  onDelete={deleteActivity}
                />
              }
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
  );
}

