import React, { useState, useEffect } from 'react';
import { useUpdateAuth } from '../context/Authcontext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';


export function ListGenerater({ list }) {
  const setAuth = useUpdateAuth();
  const navigate = useNavigate();

  return (
    <div className="grid ">
      {list.map((e, index) => (
        <button
          key={index}
          onClick={async() => {
            setAuth({ role: e.role, shop: e.shopDTO });
            const response = await api.post('/shop/enter', { shopId:e.shopDTO.shopId });
            navigate("../home");
          }}
          className="border-b bg-gray-100 hover:bg-gray-300 text-sky-800 font-semibold py-2"
        >
          {e.shopDTO.shopName} ({e.role})
        </button>
      ))}
    </div>
  );
}


function ChooseStore() {
  const setAuth = useUpdateAuth();
  const [shopName, setShopName] = useState('');
  const [shops, setShop] = useState([]);
  const [reload, setReload] = useState(false);

  const fetchShops = async () => {
    try {
      const response = await api.get('/shop/getmyshoplist');
      console.log(response.data)
      setShop(response.data);

    } catch (error) {
      console.error('Failed to fetch shop list:', error);
      alert('Error fetching your shops.');
    }
  };

  useEffect(() => {
    fetchShops();
  }, [reload]);


  return (
    <>
        <ListGenerater list={shops} />

      </>
  );
}

export default ChooseStore;
