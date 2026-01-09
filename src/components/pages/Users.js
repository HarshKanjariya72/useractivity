import "./Users.css";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";

export default function User() {
  const user = {
    name: "Username",
    email: "xyz@example.com",
    role: "User",
    gender: "Male",
    mobile: "+91 98765 43210",
    address: "Ahmedabad, Gujarat, India",
    photo: "https://api.dicebear.com/7.x/bottts/svg?seed=Bot",
  };

  const handleEdit = () => {
    alert("Edit Profile Clicked");
  };

  const handleLogout = () => {
    alert("Logged out successfully");
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <tbody>
          <tr>
            <td colSpan="2" className="photo-cell">
              <img src={user.photo} alt="Profile" />
            </td>
          </tr>

          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>

          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>

          <tr>
            <th>Role</th>
            <td>{user.role}</td>
          </tr>

          <tr>
            <th>Gender</th>
            <td>{user.gender}</td>
          </tr>

          <tr>
            <th>Mobile</th>
            <td>{user.mobile}</td>
          </tr>

          <tr>
            <th>Address</th>
            <td>{user.address}</td>
          </tr>
          <tr>
            <td colSpan="2" className="action-cell">
              <button className="edit-btn" onClick={handleEdit}>
                <FaUserEdit /> Edit Profile
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// export default function Users() {
//   return (
//     <div className="page">
//       <h2>Users</h2>

//       <table className="user-table">
//         <thead>
//           <tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
//         </thead>
//         <tbody>
//           <tr><td>Admin</td><td>admin@mail.com</td><td>Admin</td><td></td></tr>
//           <tr><td>User</td><td>user@mail.com</td><td>User</td><td></td></tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

