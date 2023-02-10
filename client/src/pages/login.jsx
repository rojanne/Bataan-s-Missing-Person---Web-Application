import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import NavbarWel from "../components/navbarWel";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./css/login.css"


const Login = ({ setAuth }) => {//tanggal
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    //setting the inputs
    const onChange = e => {    //email     : barney   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    //deconstructing the email and password variable from the inputs
    const { email, password } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //making a body object from the values of email and password
            const body = { email, password }

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()

            if (parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                localStorage.setItem("userID", parseRes.loginUser.usersid)
                setAuth(true)
            } else {
                setAuth(false)
                // console.log("Something wrong")
                toast.error(parseRes, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }
            // console.log(parseRes.loginUser.usersid);

            switch (parseRes.loginUser.usertype) {
                case 'admin':
                    window.location = "/users"
                    break;
                case 'user':
                    window.location = "/home"
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="login">
            <NavbarWel />
                <form onSubmit={onSubmitForm} className='form'>
                    <h1>Login</h1>
                    <div className="form-outline mb-4">
                        <label className="form-label" for="form2Example1">Email Address</label>
                        <br></br>
                        <input
                            type="text"
                            id="emailForm"
                            name="email"
                            className="form-control"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={e => onChange(e)} />
                    </div>


                    <div className="form-outline mb-4">
                        <label className="form-label" for="form2Example2">Password</label>
                        <br></br>
                        <input
                            type="password"
                            id="passwordForm"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => onChange(e)} />
                    </div>


                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <p className="forgot-password text-right">
                        <Link to="/register">register</Link></p>
                </form>
            </div>

    )
}
export default Login;