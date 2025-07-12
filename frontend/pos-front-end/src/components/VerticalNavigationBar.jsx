import React from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../context/Authcontext"


function VerticalNavigationBar(params) {
  const auth=useAuth()
  console.log(auth.role)
  const listitems = params.list
    .filter(e=>(e.role.includes(auth.role)||e.role.includes("all")))
    .map((item, index) => {
    const Icon = item.icon
    console.log(item.role)
    return (
      <div key={index} className="group relative flex items-center justify-center p-3 m-3">
        <NavLink to={item.link} className="group">
          {({ isActive }) => (
            <>
              <Icon
                className={`duration-300 ease-in ${isActive ? "text-sky-500" : "text-white"} group-hover:text-sky-700`}
              />
              
            </>
          )}
        </NavLink>
        <span className="absolute left-full ml-2 text-white text-sm bg-sky-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                {item.text}
              </span>
      </div>
    )
  })

  return <nav className="fixed top-0 left-0 h-full bg-sky-950 mt-20">{listitems}</nav>
}

export default VerticalNavigationBar
