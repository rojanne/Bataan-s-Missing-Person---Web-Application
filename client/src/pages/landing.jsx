import React from "react"
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import "./css/landing.css"
import NavbarWel from "../components/navbarWel";

const Landing = () => {
    return (
        <>
            <NavbarWel />
            <div className="land" style={{height:`100vh`, backgroundRepeat: 'no-repeat', width:`100%`,
                backgroundImage: `url("https://i.ytimg.com/vi/WO68HoTiLp0/maxresdefault.jpg")`,
                backgroundSize:`cover`}}>
                <div className="title">
                    <h1>Missing <span>People</span></h1>
                </div>
                <div className="tag">
                    <h4>Help Us Find Them</h4>
                </div>
                <div className="paraflex">
                    <p className="paragraph">Welcome! This Application aims to help find missing people
                        in the province of Bataan.<br></br>
                        If someone you know goes missing, you can post about them here.<br></br>
                        Come and help us find them.
                    </p>
                    <p className="loggingin">
                        <button><Link to="/login">Sign In Now</Link></button></p>
                </div>
        </div>
        </>
        
    )
}

export default Landing;