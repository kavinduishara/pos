import { useEffect, useState } from "react";
import ListGenerater from "./ListGenerater"; // adjust path if needed
import api from "../utils/api";
import { useAuth } from "../context/Authcontext";

const ChasereEmployees = () => {
  const auth = useAuth();
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await api.post("/admin/getcacherusers", {
        shopId: auth.shop.shopId,
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employee list:", error);
      alert("Error fetching your employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [auth.shop.shopId]);

  const handleDeleteUser = (email) => {
    setEmployees((prev) => prev.filter((user) => user.email !== email));
    console.log("Deleted user:", email);
  };

  const handleRole = async (email, role) => {
    try {
      if (role === "ADMIN") {
        const response = await api.put("/admin/setroletoadmin", {
          role: "ADMIN",
          shopDTO: {
            shopId: auth.shop.shopId,
          },
          userDTO: {
            email: email,
          },
        });

        console.log("Role updated successfully:", response.data);

        // Remove user from the list after role update
        setEmployees((prev) =>
          prev.filter((user) => user.email !== email)
        );
      }
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
        alert(`Network or unknown error: ${error.message}`);
      }
    }
  };

  return (
    <ListGenerater
      list={employees}
      onDelete={handleDeleteUser}
      onRole={handleRole}
    />
  );
};

export default ChasereEmployees;
