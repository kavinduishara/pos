import { useEffect, useState } from "react";
import ListGenerater from "./ListGenerater"; // adjust path if needed
import api from "../utils/api";
import { useAuth } from "../context/Authcontext";

const NewEmployees = () => {
  const auth = useAuth();
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      const response = await api.post("/admin/getadminusers", {
        shopId: auth.shop.shopId,
      });
      setShops(response.data);
    } catch (error) {
      console.error("Failed to fetch shop list:", error);
      alert("Error fetching your shops.");
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleDeleteUser = (email) => {
    setShops(prev => prev.filter(user => user.email !== email));
    console.log("Deleted user:", email);
  };
const handleRole = (email,role) => {
    setShops(prev =>
      prev.filter(user => user.email !== email)
    );
};


  return <ListGenerater list={shops} onDelete={handleDeleteUser} onRole={handleRole} />;
};
export default NewEmployees;
