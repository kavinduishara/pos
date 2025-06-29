import { NavLink, Outlet } from "react-router-dom";

export const Links=({list})=>{
    const updatedlist=list.map(e=>{
        return(
            <NavLink end to={e.link}
                className={({ isActive }) =>
                    isActive
                    ? "text-sky-700 text-md font-bold px-4 underline decoration-4 transition duration-300"
                    : "text-sky-900 text-md font-bold px-4 hover:text-sky-700 transition duration-300"
                }
            >
                {e.text}
            </NavLink>
        )
    })
    return(
    <div>
        {updatedlist}
    </div>
    )
}

const StoreManager = (params) => {
    const array=[
        {link:"",text:"CHOOSE"},
        {link:"new",text:"CREATE NEW"},
        {link:"apply",text:"APPLY"},
    ]
  return (
    <>
        <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">StoreManager</h1>
        <div className="flex ">
            <Links list={array}/>
        </div>
        <div className="flex justify-strech p-4">
        <div className="w-full max-w-4xl">
                    <Outlet/>
            </div>
        </div>
    </>
  );
};

export default StoreManager;