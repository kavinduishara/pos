import React, { useState, useEffect } from 'react';
import { useUpdateAuth } from '../context/Authcontext';
import api from '../utils/api';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';


export function ListGenerater({ list }) {
  const setAuth = useUpdateAuth();
  const navigate =useNavigate()

  return (
    <div className="grid">
      {list.map((e, index) => (
        <button
          key={index}
          onClick={async() =>{
                const response = await api.post('/shop/apply',
                    {
                        "shopId":e.shopId
                    }
                );
                console.log(response.data)
            }
          }
          className="border-b bg-gray-100 hover:bg-gray-300 text-sky-800 font-semibold py-2"
        >
          {e.shopName}
        </button>
      ))}
    </div>
  );
}

const ApplyForStore = (params) => {
    const setAuth = useUpdateAuth();
    const [shopName, setShopName] = useState('');
    const [shops, setShop] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchShops = async () => {
        try {
        const response = await api.get('/shop/getall');
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
};

export default ApplyForStore;

