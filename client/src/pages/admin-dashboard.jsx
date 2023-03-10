import Sidebar from "./admin/sidebar"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarWel from "../components/navbarWel";
import BarChart from "../components/barchart";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from "react";
import './css/admin.css'


const AdminDashboard = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/count-users",
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
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <NavbarWel />
            <Row style={{overflow: 'hidden'}}>
                <Col sm={3}> <Sidebar /></Col>
                <Col sm={9} className="rightBar">
                    <Row className="botBar">
                        <Col>
                            <h3 className="adminHead">Bataan's Missing Person Admin Dashboard</h3>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem', height: '6rem' }} className="cardAd">
                                <Card.Header className="cardHeader">Total Number of Users</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="cardList">Current Users : <span className="spanList">{users.count}</span> </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="chart">
                        <h1 className="headerBar">Reports Chart</h1>
                        <BarChart/>
                    </Row>
                </Col>
            </Row>

        </div>
    )
}
export default AdminDashboard