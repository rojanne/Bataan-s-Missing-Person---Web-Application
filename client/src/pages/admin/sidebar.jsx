import React, { useState } from 'react';
import {
    FaBars,
    FaUsers,
    FaFileContract,
    FaRegEye,
    FaSearch
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./Sidebar.css"


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
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
        }
    ]
    return (
        
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Missing People</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;