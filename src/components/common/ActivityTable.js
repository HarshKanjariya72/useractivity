export default function ActivityTable({ activities = [], onToggle, onDelete }) {
  if (!activities.length) {
    return <p style={{ padding: "20px" }}>No activities found.</p>;
  }

  return (
  <div className="table-wrapper">
    <table className="activity-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Date</th>
          <th className="action-col">Actions</th>
        </tr>
      </thead>

      <tbody>
        {activities.map(a => (
          <tr key={a.id} className={a.completed ? "completed-row" : ""}>
            <td className="name-cell">{a.name}</td>

            <td>
              <span className={`priority ${a.priority?.toLowerCase() || ""}`}>
                {a.priority || "-"}
              </span>
            </td>

            <td>
              <span className={`status-badge ${a.completed ? "done" : "pending"}`}>
                  {a.completed ? "Completed" : "Pending"}
              </span>
            </td>
            <td>{a.createdAt || "-"}</td>

            <td className="action">
                <button className={`toggle ${a.completed ? "completed" : ""}`}
                  onClick={() => onToggle(a.id)}>
                  Toggle
                </button>
                <button className="delete"
                  onClick={() => onDelete(a.id)}>
                  Delete
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}


