import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.";

const ActivityContext = createContext();
const API_URL = "http://localhost:3001/activities";

export const ActivityProvider = ({ children }) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      setActivities([]);
      return;
    }

    const fetchActivities = async () => {
      const res = await fetch(`${API_URL}?userId=${user.id}`);
      const data = await res.json();
      setActivities(data);
    };

    fetchActivities();
  }, [user]);

  const addActivity = async (activity) => {
    if (!user?.id) return;

    const newActivity = {
      name: activity.name,
      priority: activity.priority,
      completed: false,
      userId: user.id
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActivity)
    });

    const saved = await res.json();
    setActivities(prev => [...prev, saved]);
  };

  const toggleActivity = async (id) => {
    const activity = activities.find(a => a.id === id);
    if (!activity) return;

    const updated = { ...activity, completed: !activity.completed };

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });

    setActivities(prev => prev.map(a => (a.id === id ? updated : a)));
  };

  const deleteActivity = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, toggleActivity, deleteActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => useContext(ActivityContext);
