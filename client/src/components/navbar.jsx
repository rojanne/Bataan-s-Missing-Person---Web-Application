import React, { useState } from "react"
import "../pages/css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import logo from "../pages/images/MP.png"
import { toast } from "react-toastify";



const Navbar = () => {
  const [Mobile, setMobile] = useState(false)
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
  };
  return (
    <>
      <nav className='navbar'>
        <img src={logo}  className="logo"/>
        
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to='/home' style={{ textDecoration: 'none'}} className='Home'>
            <li>Home</li>
          </Link>
          <Link to='/missing-reports' style={{ textDecoration: 'none'}} className='Missing-reports'>
            <li>Missing Reports</li>
          </Link>
          <Link to='/sighted-reports' style={{ textDecoration: 'none'}} className='Sighted-reports'>
            <li>Sighted Reports</li>
          </Link>
          <Link to='/found-reports' style={{ textDecoration: 'none'}} className='Found-reports'>
            <li>People We Found</li>
          </Link>
          <div onClick={(e) => logout(e)} style={{ textDecoration: 'none'}} className='Found-reports'>
            <li>Sign Out</li>
          </div>
        </ul>

        {/* 
        whenever we click on button = setMobile(!Mobile) ==  is mobile oppsite to setMobile 
        */}
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  )
}
export default Navbar