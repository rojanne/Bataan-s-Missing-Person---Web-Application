import React, { useState } from "react"
import "../pages/css/navbar.css"
import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import logo from "../pages/images/MP.png"


const Navbar = () => {
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <nav className='navbar'>
        <Link to="/"><img src={logo}  className="logo"/></Link>
        
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
        </ul>
        <div className="Out">Sign Out</div>
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