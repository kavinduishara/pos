import { useState } from "react";
import { Outlet } from "react-router-dom"
import api from "../utils/api";

export const CreateNewStore=()=>{
    // const setAuth = useUpdateAuth();
    const [shopName, setShopName] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        console.log('Selected Shop:', shopName);
    
        try {
          const response = await api.post('/shop/createShop', { shopName });
          console.log('Shop created:', response.data);
        //   setAuth({shop:shopName});
        } catch (error) {
          console.error('Failed to create shop:', error);
          alert('Error creating shop. Check console for details.');
        }
      };
    return(
        <>
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
        </>
    )
}