import { useEffect, useState } from "react";
import ListGenerater from "./ListGenerater"; // adjust path if needed
import api from "../utils/api";
import { useAuth } from "../context/Authcontext";
import { toast } from 'react-toastify';

const AdminEmployees = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.post("/admin/getadminusers", {
        shopId: auth.shop.shopId,
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('❌ Error fetching your admin users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth.shop.shopId]);

  const handleDeleteUser = (email) => {
    setUsers((prev) => prev.filter((user) => user.email !== email));
    console.log("Deleted user:", email);
  };

  const handleRole = async (email, role) => {
    try {
      if (role === "CACHE") {
        const response = await api.put("/admin/changeadminsrole", {
          role: "CACHE",
          shopDTO: {
            shopId: auth.shop.shopId,
          },
          userDTO: {
            email: email,
          },
        });

        console.log("Role changed successfully:", response.data);

        setUsers((prev) => prev.filter((user) => user.email !== email));
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || error.message || "Unknown error";

        if (status === 401) {
          toast.error(`Unauthorized: ${error.response.data.error}`);
        } else {
          toast.error(`Error (${status}): ${message}`);
        }
      } else {
        toast.error(`Network or unknown error: ${error.message}`);
      }
    }
  };

  return (
    <ListGenerater list={users} onDelete={handleDeleteUser} onRole={handleRole} />
  );
};

export default AdminEmployees;
