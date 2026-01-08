import "./Users.css";

export default function Users() {
  return (
    <div className="page">
      <h2>Users</h2>

      <table className="user-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          <tr><td>Admin</td><td>admin@mail.com</td><td>Admin</td></tr>
          <tr><td>User</td><td>user@mail.com</td><td>User</td></tr>
        </tbody>
      </table>
    </div>
  );
}

