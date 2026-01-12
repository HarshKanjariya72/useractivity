import { useState } from "react";
import ActivityTable from "../common/ActivityTable";
import AddActivityModal from "../common/AddActivityModal";
import { useActivities } from "../../context/ActivityContext";
import "./Activity.css";

const API_URL = "http://localhost:3001/activities";

export default function Activity() {
  const { activities, addActivity, toggleActivity, deleteActivity } = useActivities();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  const filtered = (activities || [])
    .filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(a => {
      if (filter === "COMPLETED") return a.completed;
      if (filter === "PENDING") return !a.completed;
      return true;
    });

  return (
    <div className="page">
      <div className="activity-header">
        <h2>Activities</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Activity</button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search activity"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select className="custom-select" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      <ActivityTable
        activities={filtered}
        onAdd={addActivity}
        onToggle={toggleActivity}
        onDelete={deleteActivity}
      />

      {showModal && (
        <AddActivityModal
          onClose={() => setShowModal(false)}
          onAdd={addActivity}
        />
      )}
    </div>
  );
}