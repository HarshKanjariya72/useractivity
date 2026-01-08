import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/layouts/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Activity from "./components/pages/Activity";
import Users from "./components/pages/Users";

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

  return (
      <div className="app-layout" style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard activities={activities || []} />} />
            <Route
              path="/activity"
              element={
                <Activity
                  activities={activities || []}
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

