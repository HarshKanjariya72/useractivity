import "./Users.css";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.";

export default function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p>No user logged in</p>;
  }

  const handleEdit = () => {
    alert("Edit Profile Clicked");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <tbody>
          <tr>
            <td colSpan="2" className="photo-cell">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                alt="Profile"
              />
            </td>
          </tr>

          <tr>
            <th>Name</th>
            <td>{user.name || "User"}</td>
          </tr>

          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>

          <tr>
            <th>Role</th>
            <td>User</td>
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
