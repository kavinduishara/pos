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
export function PoductRow({productList,remove}) {
  return(
    <>
    {
      productList.map((e,index) => (
        <tr key={index} className="text-center">
          <td className="truncate px-2">{e.productName}</td>
          <td className="px-2">{e.issuedQuantity}</td>
          <td className="px-2">{e.unit}</td>
          <td className="px-2">{e.priceWhenBought}</td>
          <td className="px-2">{e.price}</td>
          <td className="px-2"><button onClick={()=>remove(e)} className='text-red-500 hover:text-red-700'><X className="w-4 h-4 " /></button></td>
        </tr>
      ))
    }
    
    </>
  )
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
  const [productList,setProductList]=useState([])
  const [chache,setChache]=useState(0)

  const pay=async()=>{
    try {
      const data =await api.post('/billing/makebill',{
        billProducts:productList,payment:Number(chache).toFixed(2)
      })
      console.log(data)
      setProductList([])
      setChache(0)
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || error.message || "Unknown error";
        console.log(error)
        console.log(`${error.response.data.error}`)
        alert(`${error.response.data.error}`);
        alert(`${message}`);
        if (status === 400) {
          alert(`Unauthorized: ${error.response.data.error}`);
        } else {
          alert(`Error (${status}): ${message}`);
        }
      } else {
        alert(`Network or unknown error: ${error.message}`);
      }
    }
  

}
  useEffect(()=>{
    if(search.length==3){
      fetchProduct(search,setList)
      console.log(search)
    }
  },[search])
  
  const onselect=(e)=>{
    setSelect(e)
  }
  const remove=(e)=>{
    setProductList(productList.filter(item => item.productId!=e.productId))
  }
  return(
      <>
      <div className="grid grid-cols-6 gap-6 h-full p-4 bg-gray-50">
        <div className="col-span-1 rounded-lg bg-white p-4 flex flex-col shadow-lg">
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

        <div className="col-span-2 grid grid-cols-1 gap-6">
          <div className="rounded-lg bg-white p-6 flex flex-col shadow-lg">

            {/* Product Info */}
            <div className="border-b pb-4 grid grid-cols-2 text-sm gap-4 font-mono tabular-nums">
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

            {/* Quantity Input & Total */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-inner">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700">Rs. {select.unitPrice}</span>
                <span><X className="w-4 h-4 text-red-500" /></span>
                <input
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  className="flex-1 border border-blue-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* <span className="text-gray-700 font-medium">{select.unit}</span> */}
              </div>
              <p className="mt-3 text-lg font-semibold text-sky-900">
                Total: Rs. {(Number(quantity) * Number(select.unitPrice)).toFixed(2)}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex justify-center mt-6">
            <button
              className="rounded-xl bg-green-500 hover:bg-green-600 text-white px-10 py-4 shadow-lg transition-all duration-200"
              title="Add to cart"
              onClick={() => {
                const newProd = {
                  productId: select.productId,
                  productName: select.productName,
                  unit: select.unit,
                  priceWhenBought: Number(select.unitPrice),
                  issuedQuantity: Number(quantity),
                  price: (Number(quantity) * Number(select.unitPrice)).toFixed(2)
                };

                const existingIndex = productList.findIndex(
                  (item) => item.productId === newProd.productId
                );

                if (existingIndex !== -1) {
                  // Product already in cart — update quantity and price
                  const updatedList = [...productList];
                  const updatedItem = { ...updatedList[existingIndex] };
                  updatedItem.issuedQuantity += newProd.issuedQuantity;
                  updatedItem.price = (updatedItem.issuedQuantity * updatedItem.priceWhenBought).toFixed(2);
                  updatedList[existingIndex] = updatedItem;
                  setProductList(updatedList);
                } else {
                  // Product not in cart — add new one
                  setProductList((prev) => [...prev, newProd]);
                }
                setQuantity(0)
                setSelect({productId:0,productName:"_",quantity:"_",unit:"_",unitPrice:0,shopId:auth.shop.shopId})
              }}
            >
              <ShoppingCart className="w-6 h-6" />
            </button>

            </div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-1 gap-6">
          {/* Cart Table */}
          <div className="rounded-lg bg-white p-6 flex flex-col shadow-lg overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <tbody>
                <PoductRow productList={productList} remove={remove} />
              </tbody>
            </table>
            <div className="mt-auto pt-4 border-t border-gray-300 text-right flex justify-between">
              <button
                className={`p-2 px-9 border-3 rounded-xl text-white ${
                  productList.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-700 hover:bg-red-800'
                }`}
                disabled={productList.length === 0}

                onClick={()=>{
                  pay()
                  
                }}
              >pay</button>
              <div>
                <label className='mr-3 text-lg font-semibold text-sky-800'>Paid:</label>
                <input
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) => setChache(e.target.value)}
                  value={chache}
                  className="flex-1 border border-blue-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <p className="text-lg font-semibold text-sky-800">
                Total: Rs. {productList.reduce((acc, item) => acc + item.priceWhenBought * item.issuedQuantity, 0).toFixed(2)}
              </p>
              <p className="text-lg font-semibold text-sky-800">
                Change: Rs. {
                chache-productList.reduce((acc, item) => acc + item.priceWhenBought * item.issuedQuantity, 0).toFixed(2)
                }
              </p>
              </div>
              
              
            </div>
          </div>

        </div>
      </div>
      </>
  )
}

export default HomePage;