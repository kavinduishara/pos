import React, { useState } from 'react';
import { useUpdateAuth } from '../context/Authcontext';
import api from '../utils/api';
import { useEffect } from 'react';

function ChooseStore() {
  const setAuth = useUpdateAuth();
  const [shopName, setShopName] = useState('');

  useEffect(async () => {
    try {
      const response = await api.post('/shop/getmyshoplist');
      console.log('Shop created:', response.data);

      setAuth(true, shopName);
    } catch (error) {
      console.error('Failed to create shop:', error);
      alert('Error creating shop. Check console for details.');
    }
  }, []);

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
