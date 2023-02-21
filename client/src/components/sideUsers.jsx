import React, { useState } from 'react';
import {
    FaBars,
    FaUsers,
    FaFileContract,
    FaRegEye,
    FaSearch,
    FaUserTie,
    FaSignOutAlt,
    FaHome
} from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import "../pages/admin/Sidebar.css"


const SidebarUser = ({ children }) => {

    const menuItem = [
        {
            path: "/home",
            name: "Home",
            icon: <FaHome />
        },
        {
            path: "/missing-reports",
            name: "Missing Person Reports",
            icon: <FaFileContract />
        },
        {
            path: "/sighted-reports",
            name: "Sighted Person Reports",
            icon: <FaRegEye />
        },
        {
            path: "/found-reports",
            name: "Found Reports",
            icon: <FaSearch />
        },


    ]

    const navigate = useNavigate();
    const logout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            console.log("token is removed");
        } catch (err) {
            console.error(err.message);
        }
        navigate("/");
    }

        return (

            <div className="sidebar">
                <div className="top_section">
                    <h1 className="logo">Bataan's Missing Person</h1>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className='signOut' onClick={(e) => logout(e)} style={{ textDecoration: 'none' }} >
                    <li><FaSignOutAlt className='iconOut' />Sign Out</li>
                </div>

                <main>{children}</main>
            </div>
        );
    };

    export default SidebarUser;