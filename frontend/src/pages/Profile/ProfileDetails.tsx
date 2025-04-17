import { useEffect, useState } from "react";
import axios from "axios";

const ProfileDetails = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:8081/auth/home", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch((err) => console.error("Failed to fetch user", err));
    }
  }, []);

  if (!user) return <div>Loading user details...</div>;

  return (
    <div>
      <h2>Profile Details</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
    </div>
  );
};

export default ProfileDetails;
