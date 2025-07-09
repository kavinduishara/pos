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
  const handleRole = async (email, role) => {
      if (role === 'CACHE') {
        const response = await api.put("/admin/setrole", {
          role:"CACHE",
          shopDTO:{
            shopId: auth.shop.shopId,
          },
          userDTO:{
            email:email
          }
        });
        console.log(response)
      setusers(prev =>
        prev.filter(user => user.email !== email)
      );
      }
    };


  return <ListGenerater list={users} onDelete={handleDeleteUser} onRole={handleRole} />;
};

export default AdminEmployees;
