import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './sidebar';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import NavbarWel from '../../components/navbarWel';
import './users.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import UserEdit from './components/users-edit';





const Users = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/users",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    users: JSON.stringify(users)
                }
            )
            const jsonData = await response.json();

            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async id => {
        try {
            const deleteUser = await fetch(`http://localhost:8000/users/${id}`, {
                method: "DELETE"
            });

            setUsers(users.filter(user => user.usersid !== id));
        } catch (err) {
            console.error(err.message);
        }
        toast('User Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }



    return (
        <div>
            <NavbarWel />
            <div className='all'>
            <Row>
                <Col sm={3}> <Sidebar /></Col>
                <Col sm={9} className="Table">
                    <h1 className='upheader'>Current Users</h1>
                    <Table hover responsive className='table'>
                        <thead className='theHead'>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>User Type</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.usersid}>
                                    <td>{user.usersid}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.usertype}</td>
                                    <td style={{display: 'flex', gap: '10px'}}><button className="btn btn-danger" onClick={() => deleteUser(user.usersid)}>Delete</button><UserEdit user={user}/></td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
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
                theme="dark"
            />
            </div>
        </div>
    )
}
export default Users