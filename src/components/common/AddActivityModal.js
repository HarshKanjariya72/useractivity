import { useState } from "react";
import "./Modal.css";

export default function AddActivityModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");

  const handleAdd = () => {
    if (!name || name.length < 3) return alert("Name must be at least 3 characters");
    if (!priority) return alert("Select priority");

    onAdd?.({
      id: Date.now(),
      name,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    });

    onClose?.();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Activity</h3>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

