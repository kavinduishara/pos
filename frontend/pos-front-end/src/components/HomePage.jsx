import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext';
import api from '../utils/api';
import { ShoppingCart, ShoppingCartIcon, X } from 'lucide-react';

export function ListGenerater({ list ,search,onselect}) {
  return (
    <div className="grid ">
      {list.filter(e => e.productName.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.productName.localeCompare(b.productName))
      .map((e, index) => (
        <button
          key={index}
          onClick={async() => {
            onselect(e)
          }}
          className="border-b rounded-sm bg-sky-700 hover:bg-sky-800 text-sky-50 font-semibold py-2 my-2"
        >
          {e.productName}
        </button>
      ))}
    </div>
  );
}

const fetchProduct=async (search,setList)=>{
      const data = await api.get('/cacher/product/'+search)
      console.log(search)
      console.log(data.data)
      setList(data.data)
}
const HomePage=()=> {
  const auth = useAuth();
  const [select,setSelect]=useState({productId:0,productName:"_",quantity:"_",unit:"_",unitPrice:0,shopId:auth.shop.shopId})
  const [search,setSearch]=useState("");
  const [list,setList]=useState([]);
  const [quantity,setQuantity]=useState(0)
  const [price,setPrice]=useState(0)

  useEffect(()=>{
    if(search.length==3){
      fetchProduct(search,setList)
      console.log(search)
    }
  },[search])
  
  const onselect=(e)=>{
    setSelect(e)
  }
  return(
      <>
      <div className="grid grid-cols-3 gap-6 h-full p-4 bg-gray-50">

  {/* 🔍 Product Search & List */}
  <div className="rounded-lg bg-white p-4 flex flex-col shadow-lg">
    <input
      type="text"
      placeholder="Search product..."
      onChange={(e) => setSearch(e.target.value)}
      className="border border-blue-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div className="mt-6 overflow-y-auto max-h-[400px] custom-scrollbar">
      <ListGenerater list={list} search={search} onselect={onselect} />
    </div>
  </div>

  {/* 📦 Product Details & Order Input */}
  <div className="rounded-lg bg-white p-6 flex flex-col shadow-lg">

    {/* Product Info */}
    <div className="border-b pb-4 grid grid-cols-2 text-sm gap-4 font-mono tabular-nums ">
      <div className="text-gray-500">
        <p>PRODUCT</p>
        <p>EXISTING QUANTITY</p>
        <p>UNIT PRICE</p>
        <p>UNIT</p>
      </div>
      <div>
        <p>{select.productName}</p>
        <p>{select.quantity}</p>
        <p>Rs. {select.unitPrice}</p>
        <p>{select.unit}</p>
      </div>
    </div>

    {/* Quantity Input & Total Price */}
    <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-inner">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-700">Rs. {select.unitPrice}</span>
        <span><X className="w-4 h-4 text-red-500" /></span>
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          className="flex-1 w-10 border border-blue-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-gray-700 font-medium">{select.unit}</span>
        
      </div>
      <p className="mt-3 text-lg font-semibold text-sky-900">
        Total: Rs. {(Number(quantity) * Number(select.unitPrice)).toFixed(2)}
      </p>
    </div>

    {/* 🛒 Add to Cart Button */}
    <div className="flex justify-center mt-6">
      <button
        className="rounded-xl bg-green-500 hover:bg-green-600 text-white p-20 shadow-lg transition-all duration-200"
        title="Add to cart"
      >
        <ShoppingCart className="w-10 h-10" />
      </button>
    </div>
  </div>

  <div className="rounded-lg bg-white p-6 flex flex-col shadow-lg overflow-x-auto">
  <table className="w-full table-fixed text-sm">
    <tbody>
      {/* sample row */}
      <tr className="text-center">
        <td className="truncate px-2">Longp</td>
        <td className="px-2">5</td>
        <td className="px-2">pcs</td>
        <td className="px-2">100.00</td>
        <td className="px-2">500.00</td>
      </tr>
    </tbody>
  </table>
</div>


</div>


      </>
  )
}

export default HomePage;