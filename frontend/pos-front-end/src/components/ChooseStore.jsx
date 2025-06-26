import React, { useState, useEffect } from 'react';
import { useUpdateAuth } from '../context/Authcontext';
import api from '../utils/api';

function ChooseStore() {
  const setAuth = useUpdateAuth();
  const [shopName, setShopName] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await api.get('/shop/getmyshoplist');
        console.log('My Shops:', response.data);

        // Optionally auto-select first shop if available
        if (response.data.length > 0) {
          const firstShop = response.data[0];
          setShopName(firstShop.shopName);
          setAuth(true, firstShop.shopName); // or use a shop ID if needed
        }
      } catch (error) {
        console.error('Failed to fetch shop list:', error);
        alert('Error fetching your shops.');
      }
    };

    fetchShops();
  }, [setAuth]);

  const submit = async (e) => {
    e.preventDefault();
    console.log('Selected Shop:', shopName);

    try {
      const response = await api.post('/shop/createShop', { shopName });
      console.log('Shop created:', response.data);

      setAuth(true, shopName);
    } catch (error) {
      console.error('Failed to create shop:', error);
      alert('Error creating shop. Check console for details.');
    }
  };

  return (
    <>
      <h1>Store Selection</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Enter store name"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ChooseStore;
