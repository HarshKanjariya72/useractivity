import { Routes, Route } from "react-router-dom";
import UserActivityDashboard from "./components/UserActivityDashboard";
import Users from "./components/layouts/Users";
import Activity from "./components/layouts/Activity";
import Settings from "./components/layouts/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserActivityDashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;

