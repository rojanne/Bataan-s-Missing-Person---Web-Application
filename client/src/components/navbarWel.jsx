import React, { useState } from "react"
import "./navbarWel.css"
import logo from "../pages/images/bmp3.png"


const NavbarWel = () => {
    const [Mobile, setMobile] = useState(false)
    return (
      <>
        <nav className='navbarWel'>
        <img src={logo}  className="logo"/>
        </nav>
      </>
    )
  }
  export default NavbarWel