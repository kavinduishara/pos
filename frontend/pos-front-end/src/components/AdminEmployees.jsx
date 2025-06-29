import { useEffect, useState } from "react";
import ListGenerater from "./ListGenerater"; // adjust path if needed
import api from "../utils/api";
import { useAuth } from "../context/Authcontext";

const AdminEmployees = () => {
  const auth = useAuth();
  const [users, setusers] = useState([]);

  const fetchusers = async () => {
    try {
      const response = await api.post("/admin/getadminusers", {
        shopId: auth.shop.shopId,
      });
      setusers(response.data);
    } catch (error) {
      console.error("Failed to fetch shop list:", error);
      alert("Error fetching your shops.");
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const handleDeleteUser = (email) => {
    setusers(prev => prev.filter(user => user.email !== email));
    console.log("Deleted user:", email);
  };
const handleRole = (email, role) => {
  if (role === 'cashier') {
    setusers(prev =>
      prev.filter(user => user.email !== email)
    );
  }
};


  return <ListGenerater list={users} onDelete={handleDeleteUser} onRole={handleRole} />;
};

export default AdminEmployees;
