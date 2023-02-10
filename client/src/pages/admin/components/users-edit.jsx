import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const UserEdit = ({ user }) => {
    // console.log(user);
    const [usertype, setusertype] = useState(user.usertype);

    // const { usertype } = usertype
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const body = { usertype };
            const response = await fetch(
                `http://localhost:8000/users/${user.usersid}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json()
            console.log(parseRes)
            
            toast.success('User Updated!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            window.location.reload()
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${user.usersid}`}
            >
                Edit
            </button>

            <div
                className="modal"
                id={`id${user.usersid}`}
                
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{user.first_name} {user.last_name}</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                onClick={() => setusertype(user.usertype)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <h5>Change User Type: (admin or user)</h5>
                            <select className="form-control"
                                value={usertype}
                                onChange={e => setusertype(e.target.value)}>
                                <option value="">Select type</option>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                            {/* <input
                                type="text"
                                className="form-control"
                                value={usertype}
                                onChange={e => setusertype(e.target.value)}
                            /> */}
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={e => updateUser(e)}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => setusertype(user.usertype)}
                            >
                                Close
                            </button>
                            <ToastContainer
                                position="top-center"
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
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UserEdit;