import React, { useState, useEffect } from 'react';
import { useUpdateAuth } from '../context/Authcontext';
import api from '../utils/api';

export function ListGenerater({ list }) {
  const listitems = list.map((e, index) => (
    <p key={index}>{e.shop.shopName}</p>
  ));

  return <div>{listitems}</div>;
}

function ChooseStore() {
  const setAuth = useUpdateAuth();
  const [shopName, setShopName] = useState('');
  const [shops,setShop]=useState([])

  useEffect(()=>{
    shops.forEach(e => {
      console.log(e.shop.shopName)
    })
  },[shops])
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await api.get('/shop/getmyshoplist');
        console.log('My Shops:', response.data);
        setShop(response.data)
        
        

      } catch (error) {
        console.error('Failed to fetch shop list:', error);
        alert('Error fetching your shops.');
      }
    };

    fetchShops();

    
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
      <ListGenerater list={shops}/>

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
