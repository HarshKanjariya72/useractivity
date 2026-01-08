import "./Dashboard.css";

export default function Dashboard({ activities }) {
  const total = activities.length;
  const completed = activities.filter(a => a.completed).length;
  const pending = total - completed;
  const high = activities.filter(a => a.priority === "High").length;

  return (
    <div className="page">
      <h2>Activity Dashboard</h2>

      <div className="cards">
        <div className="card blue">Total <br /><b>{total}</b></div>
        <div className="card green">Completed<br /><b>{completed}</b></div>
        <div className="card orange">Pending<br /><b>{pending}</b></div>
        <div className="card red">High Priority<br /><b>{high}</b></div>
      </div>
    </div>
  );
}
