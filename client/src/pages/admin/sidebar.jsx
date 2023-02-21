import React, { useState } from 'react';
import {
    FaBars,
    FaUsers,
    FaFileContract,
    FaRegEye,
    FaSearch,
    FaUserTie,
    FaSignOutAlt
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./Sidebar.css"


const Sidebar = ({children}) => {
   
    const menuItem=[
        {
            path:"/admin",
            name:"Admin Dashboard",
            icon:<FaUserTie/>
        },
        {
            path:"/users",
            name:"Users",
            icon:<FaUsers/>
        },
        {
            path:"/admin-missing",
            name:"Missing People Reports",
            icon:<FaFileContract/>
        },
        {
            path:"/admin-sighted",
            name:"Sighted Reports",
            icon:<FaRegEye/>
        },
        {
            path:"/admin-found",
            name:"Found Reports",
            icon:<FaSearch/>
        },
        {
            path:"/",
            name:"Sign Out",
            icon:<FaSignOutAlt/>
        }
    ]
    return (
        
           <div className="sidebar">
               <div className="top_section">
                   <h1  className="logo">Bataan's Missing Person</h1>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div  className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;