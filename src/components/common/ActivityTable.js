export default function ActivityTable({ activities = [], onToggle, onDelete }) {
  if (!activities.length) {
    return <p style={{ padding: "20px" }}>No activities found.</p>;
  }

  return (
    <table className="activity-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {activities.map(a => (
          <tr key={a.id} className={a.completed ? "completed-row" : ""}>
            <td className={a.completed ? "completed-text" : ""}>{a.name}</td>

            <td>
              <span className={`priority ${a.priority?.toLowerCase() || ""}`}>
                {a.priority || "-"}
              </span>
            </td>

            <td>{a.completed ? "Completed" : "Pending"}</td>
            <td>{a.createdAt || "-"}</td>

            <td>
                <button className="toggle" onClick={() => onToggle?.(a.id)}>
                  Toggle
                </button>
                <button className="delete" onClick={() => onDelete?.(a.id)}>
                  Delete
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


