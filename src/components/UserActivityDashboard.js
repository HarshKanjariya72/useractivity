import { useState } from "react";
import "./UserActivityDashboard.css";

export default function UserActivityDashboard() {
  const [activityName, setActivityName] = useState("");
  const [activities, setActivities] = useState([]);

  const isValid = activityName.trim().length >= 3;

  const addActivity = () => {
    if (!isValid) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setActivities([
      ...activities,
      {
        id: Date.now(),
        name: activityName.trim(),
        completed: false,
        time,
      },
    ]);

    setActivityName("");
  };

  const toggleStatus = (id) => {
    setActivities(
      activities.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const total = activities.length;
  const completed = activities.filter((a) => a.completed).length;
  const pending = total - completed;

  return (
    <div className="dashboard">
      <h2 className="title">User Activity Dashboard</h2>

      <input
        className="input-box"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        placeholder="Enter activity"
      />

      {!isValid && activityName.length > 0 && (
        <p className="error">Minimum 3 characters required</p>
      )}

      <button
        onClick={addActivity}
        disabled={!isValid}
        className={`add-btn ${isValid ? "enabled" : "disabled"}`}
      >
        Add Activity
      </button>

      <div className="stats">
        <span>Total: {total}</span>
        <span>Completed: {completed}</span>
        <span>Pending: {pending}</span>
      </div>

      {activities.length === 0 && (
        <p className="empty">No activities yet</p>
      )}

      {activities.map((act) => (
        <div
          key={act.id}
          className={`card ${act.completed ? "completed" : ""}`}
        >
          <div>
            <p
              className={`activity-name ${
                act.completed ? "completed" : ""
              }`}
            >
              {act.name}
            </p>
            <p className="time">Created at {act.time}</p>
          </div>

          <div>
            <span
              className={`badge ${
                act.completed ? "completed" : "pending"
              }`}
            >
              {act.completed ? "🟢 Completed" : "🟡 Pending"}
            </span>

            <button
              className="toggle-btn"
              onClick={() => toggleStatus(act.id)}
            >
              Toggle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
