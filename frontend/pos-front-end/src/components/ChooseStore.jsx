import React, { useState, useEffect } from 'react';
import { useUpdateAuth } from '../context/Authcontext';
import api from '../utils/api';
import { Navigate, useNavigate } from 'react-router-dom';


export function ListGenerater({ list }) {
  const setAuth = useUpdateAuth();
  const navigate =useNavigate()

  return (
    <div className="grid gap-2 mb-4">
      {list.map((e, index) => (
        <button
          key={index}
          onClick={() =>{

              setAuth({role:e.role,shop:e.shop.shopName})
              navigate("home")
            }
          }
          className="rounded-sm bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2"
        >
          {e.shop.shopName} ({e.role})
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
      setShop(response.data);
      console.log('My Shops:', response.data);
    } catch (error) {
      console.error('Failed to fetch shop list:', error);
      alert('Error fetching your shops.');
    }
  };

  useEffect(() => {
    fetchShops();
  }, [reload]);

  const submit = async (e) => {
    e.preventDefault();
    console.log('Selected Shop:', shopName);

    try {
      const response = await api.post('/shop/createShop', { shopName });
      console.log('Shop created:', response.data);
      setAuth({shop:shopName});
      setReload(prev => !prev)
    } catch (error) {
      console.error('Failed to create shop:', error);
      alert('Error creating shop. Check console for details.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 h-auto rounded-lg shadow-lg p-6 bg-white">
        <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">
          Store Selection
        </h1>

        <ListGenerater list={shops} />

        <form onSubmit={submit} className="grid gap-4">
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Enter store name"
            className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-sm bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
          >
            Create New Shop
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChooseStore;
