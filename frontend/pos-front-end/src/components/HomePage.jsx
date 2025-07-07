import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext';
import api from '../utils/api';

export function ListGenerater({ list }) {
  return (
    <div className="grid ">
      {list.map((e, index) => (
        <button
          key={index}
          onClick={async() => {
            
          }}
          className="border-b bg-gray-100 hover:bg-gray-300 text-sky-800 font-semibold py-2"
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

  const [search,setSearch]=useState("");
  const [list,setList]=useState([]);
  useEffect(()=>{
    if(search.length==3){
      fetchProduct(search,setList)
      console.log(search)
    }
  },[search])
  const auth = useAuth();
  return(
      <>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="rounded-lg bg-white p-4 flex flex-col shadow-xl">
          <input
            type="text"
            placeholder="product"
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-sm border-4 border-sky-800 bg-sky-100 focus:outline-none"
          />
          <div>
            <ListGenerater list={list}/>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 flex flex-col shadow-xl">
          {/* Second column content */}
        </div>
      </div>

      </>
  )
}

export default HomePage;