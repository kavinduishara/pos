import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext';
import api from '../utils/api';
import { CirclePlus, Notebook, Plus, Save, Trash, X } from 'lucide-react';

export function ListGenerater({ list ,onselect,search}) {
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
          className="border-b bg-sky-700 hover:bg-sky-800 text-sky-50 font-semibold py-2 my-2"
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

const StockManager=(paams) =>{
  const [search,setSearch]=useState("");
  const [list,setList]=useState([]);

  useEffect(()=>{
    if(search.length==3){
      fetchProduct(search,setList)
      console.log(search)
    }
    if(search.length==0){
      setList([])
    }
  },[search])
    const auth = useAuth();
    const [select,setSelect]=useState({productId:0,productName:"",quantity:"",unit:"",unitPrice:0,shopId:auth.shop.shopId})


  const onselect=(e)=>{
    setSelect(e)
  }
  return(
      <>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-lg bg-white p-4 flex flex-col shadow-xl">
          <input
            type="text"
            placeholder="product"
            onChange={(e) => setSearch(e.target.value)}
          className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className='mt-8 overflow-y-auto max-h-100'>
            <ListGenerater list={list} onselect={onselect} search={search}/>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 flex flex-col shadow-xl">
          <div className='flex justify-between'>
            <div>
                <span className='group '>
                    <button className='text-red-500 hover:text-red-600'><Trash/></button>
                    <div className='rounded-sm absolute opacity-0 group-hover:opacity-100 p-1 text-white bg-sky-700 pointer-events-none'>
                        Delete
                    </div>
                </span>
                <span className='group '>
                <button className='text-blue-500 hover:text-blue-600'
                onClick={async() =>
                    {
                        const data = await api.put('admin/store/changeProduct',select)
                        fetchProduct(search,setList)
                        console.log(data.data)
                    }
                }
                ><Save/></button>
                    <div className='rounded-sm absolute opacity-0 group-hover:opacity-100 ml-10 p-1 text-white bg-sky-700 pointer-events-none'>
                        Save
                    </div>
                </span>
                <span className='group '>
                <button className='text-green-500 hover:text-green-600'
                onClick={async() =>
                    {
                        const data = await api.post('admin/store/addproduct',select)
                        fetchProduct(search,setList)
                        console.log(data.data)
                    }
                }
                ><CirclePlus/></button>
                    <div className='rounded-sm absolute opacity-0 group-hover:opacity-100 ml-18 p-1 text-white bg-sky-700 pointer-events-none'>
                        Add
                    </div>
                </span>
                
            </div>
            
            <span className='group '>
                <button className='text-red-500 hover:text-red-600'
                onClick={() =>
                setSelect({ productId: 0, productName: "", quantity: "", unit: "", unitPrice: 0 })
                }
                ><X/></button>                    
                <div className='rounded-sm absolute opacity-0 group-hover:opacity-100 p-1 text-white bg-sky-700 pointer-events-none'>
                    clear
                </div>
            </span>
            
          </div>
          <div className='mt-10 grid grid-cols-1 gap-4 h-100'>
            <input
            type="text"
            placeholder="Product ID"
            className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
            value={select.productId}
            />

            <input
            type="text"
            placeholder="Product Name"
            className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={select.productName}
            onChange={(e) => setSelect(prev => ({ ...prev, productName: e.target.value }))}
            />

            <input
            type="text"
            placeholder="Unit"
            className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={select.unit}
            onChange={(e) => setSelect(prev => ({ ...prev, unit: e.target.value }))}
            />

            <input
            type="number"
            placeholder="Unit Price"
            className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={select.unitPrice}
            onChange={(e) => setSelect(prev => ({ ...prev, unitPrice: e.target.value }))}
            />

            <input
            type="number"
            placeholder="Quantity"
            className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={select.quantity}
            onChange={(e) => setSelect(prev => ({ ...prev, quantity: e.target.value }))}
            />

        </div>

        </div>
      </div>

      </>
  )
}

export default StockManager;