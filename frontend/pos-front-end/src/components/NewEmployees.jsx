import { useEffect, useState } from "react";
import ListGenerater from "./ListGenerater"; // adjust path if needed
import api from "../utils/api";
import { useAuth } from "../context/Authcontext";

const NewEmployees = () => {
  const auth = useAuth();
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      console.log("shopId:", auth.shop?.shopId);
      const response = await api.post("/admin/getnewusers", {
        shopId: auth.shop.shopId,
      });
      console.log(shops)
      setShops(response.data);
    } catch (error) {
      console.error("Failed to fetch shop list:", error);
      alert("Error fetching your shops.");
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleDeleteUser = async (email) => {
    // const response = await api.post("/admin/setrole", {
    //     shopId: auth.shop.shopId,
    //   });
    setShops(prev => prev.filter(user => user.email !== email));
      console.log("Deleted user:", email);
    };
    const handleRole = async (email,role) => {
      const response = await api.put("/admin/setrole", {
        role:role.toUpperCase(),
        shopDTO:{
          shopId: auth.shop.shopId,
        },
        userDTO:{
          email:email
        }
      });
      console.log(response)
    setShops(prev =>
      prev.filter(user => user.email !== email)
    );
    };


    return <ListGenerater list={shops} onDelete={handleDeleteUser} onRole={handleRole} />;
};
export default NewEmployees;
