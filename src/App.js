import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext.";

import Sidebar from "./components/layouts/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Activity from "./components/pages/Activity";
import Users from "./components/pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/login/Register";

const API_URL = "http://localhost:3001/activities";

export default function App() {
  const [activities, setActivities] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setActivities([]);
      return;
    }

    fetch(`${API_URL}?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error("Failed to fetch activities:", err));
  }, [user?.id]);

  const addActivity = async (activity) => {
    if (!user?.id) return;

    const newActivity = {
      name: activity.name,
      priority: activity.priority,
      completed: false,
      userId: user.id,
      createdAt: new Date().toLocaleDateString()
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActivity)
    });

    const saved = await res.json();
    setActivities(prev => [...prev, saved]);
  };

  const toggleActivity = async (id, completed) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    });

    if (res.ok) {
      setActivities(prev =>
        prev.map(a => (a.id === id ? { ...a, completed: !completed } : a))
      );
    }
  };


  const deleteActivity = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (res.ok) {
      setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-layout" style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard activities={activities} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <Activity
                  activities={activities}
                  onAdd={addActivity}
                  onToggle={toggleActivity}
                  onDelete={deleteActivity}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
