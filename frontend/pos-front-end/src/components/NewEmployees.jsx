import { useEffect, useState } from "react";
import ListGenerater from "./ListGenerater"; // adjust path if needed
import api from "../utils/api";
import { useAuth } from "../context/Authcontext";

const NewEmployees = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.post("/admin/getnewusers", {
        shopId: auth.shop.shopId,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch new users:", error);
      alert("Error fetching new users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth.shop.shopId]);

  const handleDeleteUser = async (email) => {
    try {
      // Optional: send an API request to delete/reject user
      setUsers((prev) => prev.filter((user) => user.email !== email));
      console.log("Deleted user:", email);
    } catch (error) {
      alert(`Failed to delete user: ${email}`);
    }
  };

  const handleRole = async (email, role) => {
    const payload = {
      role: role.toUpperCase(),
      shopDTO: { shopId: auth.shop.shopId },
      userDTO: { email },
    };

    try {
      const endpoint =
        role.toUpperCase() === "ADMIN"
          ? "/admin/setroletoadmin"
          : "/admin/setrole";

      const response = await api.put(endpoint, payload);

      console.log("Role set successfully:", response.data);
      setUsers((prev) => prev.filter((user) => user.email !== email));
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || error.message || "Unknown error";

        if (status === 401) {
          alert(`Unauthorized: ${error.response.data.error}`);
        } else {
          alert(`Error (${status}): ${message}`);
        }
      } else {
        alert(`Network or unexpected error: ${error.message}`);
      }
    }
  };

  return (
    <ListGenerater list={users} onDelete={handleDeleteUser} onRole={handleRole} />
  );
};

export default NewEmployees;
