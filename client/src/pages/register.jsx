import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarWel from "../components/navbarWel";


const Register = () => {
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const onChange = e => {    //username     : barney   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const { first_name, last_name, email, password } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { first_name, last_name, email, password }

            const response = await fetch(
                "http://localhost:8000/register",
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
                toast.success('Registered Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setInputs({first_name: "",
                last_name: "",
                email: "",
                password: ""})
            } else {
                console.log("Something wrong")
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

        } catch (error) {
            console.log(error.message)
        }

    }
    return (
        <div className="register">
            <NavbarWel />
            <form onSubmit={onSubmitForm}>
                <h1>Register</h1>
                <div className="form-outline mb-4">
                    <label>First name</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={first_name}
                        placeholder="Enter your first name"
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-outline mb-4">
                    <label>Last name</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={last_name}
                        placeholder="Enter your last name"
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-outline mb-4">
                    <label>Email address</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-outline mb-4">
                    <label>Password</label>
                    <br></br>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={e => onChange(e)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
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
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
                <p className="forgot-password text-right">Already registered?
                    <Link to="/login">Login</Link></p>
            </form>

        </div>
    )
}
export default Register;