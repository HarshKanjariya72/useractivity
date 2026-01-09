import { useState } from "react";
import "./Modal.css";

export default function AddActivityModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({ name: "", priority: "" });

  const handleAdd = () => {
    let valid = true;
    const newErrors = { name: "", priority: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      valid = false;
    }
    if (!priority) {
      newErrors.priority = "Select priority";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return; 

    onAdd?.({
      id: Date.now(),
      name: name.trim(),
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    });

    onClose?.();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Activity</h3>

        <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
         {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <span className="error">{errors.priority}</span>}
        </div>
        
        <div className="modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

