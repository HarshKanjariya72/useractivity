import { useState } from "react";
import "./UserActivityDashboard.css";

export default function UserActivityDashboard() {
  const [activityName, setActivityName] = useState("");
  const [activities, setActivities] = useState([]);
  const [priority, setPriority] = useState("");

  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("LATEST");
  const [search, setSearch] = useState("");

  const isNameValid = activityName.trim().length >= 3;
  const isPriorityValid = priority !== "";
  const isFormValid = isNameValid && isPriorityValid;

  const addActivity = () => {
    if (!isFormValid) return;

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
        priority: priority,
        completed: false,
        time,
      },
    ]);

    setActivityName("");
    setPriority("");
  };

  const toggleStatus = (id) => {
    setActivities(
      activities.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const filteredActivities = activities.filter((a) => {
    if (filter === "PENDING") return !a.completed;
    if (filter === "COMPLETED") return a.completed;
    return true;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortBy === "LATEST") return b.id - a.id;
    if (sortBy === "OLDEST") return a.id - b.id;
    if (sortBy === "HIGH") {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
    }
    return 0;
  });

  const visibleActivities = sortedActivities.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = activities.length;
  const completed = activities.filter((a) => a.completed).length;
  const pending = total - completed;
  const highPriority = activities.filter(
    (a) => a.priority === "High"
  ).length;

  return (
    <div className="dashboard">
      <h2 className="title">User Activity Dashboard</h2>

      <input
        className="input-box"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        placeholder="Enter activity"
      />

      {!isFormValid && activityName.length > 0 && (
        <p className="error">Minimum 3 characters required</p>
      )}

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
     </select>
        {!isPriorityValid && <p className="error">Priority is required</p>}

      <button
        onClick={addActivity}
        disabled={!isFormValid}
        className={`add-btn ${isFormValid ? "enabled" : "disabled"}`}
      >
        Add Activity
      </button>

      <div className="stats">
        <span>Total: {total}</span>
        <span>Completed: {completed}</span>
        <span>Pending: {pending}</span>
        <span>High Priority: {highPriority}</span>
      </div>

      <input
        className="search"
        placeholder="Search activity..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="controls">
        <button disabled={!total} onClick={() => setFilter("ALL")}>All</button>
        <button disabled={!total} onClick={() => setFilter("PENDING")}>Pending</button>
        <button disabled={!total} onClick={() => setFilter("COMPLETED")}>Completed</button>

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="LATEST">Latest First</option>
          <option value="OLDEST">Oldest First</option>
          <option value="HIGH">High Priority First</option>
        </select>
      </div>

      {activities.length === 0 && (
        <p className="empty">No activities yet</p>
      )}
    <div>
      {visibleActivities.map((a) => (
        <div
          key={a.id}
          className={`card ${a.completed ? "completed" : ""}`}
        >
          <div>
            <p
              className={`activity-name ${
                a.completed ? "completed" : ""
              }`}
            >
              {a.name}
            </p>
            <p className="time">Created at {a.time}</p>
          </div>

          <div className="badge">
            <span className={`priority ${a.priority.toLowerCase()}`}>
                {a.priority}
            </span>
            <span
              className={`badge ${
                a.completed ? "completed" : "pending"
              }`}
            >
              {a.completed ? "Completed" : " Pending"}
            </span>

            <button
              className="toggle-btn"
              onClick={() => toggleStatus(a.id)}
            >
              Toggle
            </button>
            <button className="delete" onClick={() => deleteActivity(a.id)}>
                Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
