import Navbar from "../components/navbar";
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from "react";
import "./css/missing-reports.css"
import Container from 'react-bootstrap/Container';
import SightedModal from "../components/modal-sighted";
import NavbarWel from "../components/navbarWel";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SidebarUser from "../components/sideUsers";


const Sighted = () => {
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/sighted",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    reports: JSON.stringify(reports)
                }
            )
            const jsonData = await response.json();

            setReports(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getReports();
    }, []);

    return (
        <div className="missingAll">
            <NavbarWel />
            <Row>
                <Col sm={3}> <SidebarUser /></Col>
                <Col sm={9} className="right">
                    <div className="MissingHeader">
                        <h1>Missing People who have been sighted but still not found:</h1>
                    </div>
                    <div className="cardHolder">
                        {reports.map(report => (
                            <Card classname="card" style={{ width: '20rem', marginBottom: '30px', borderRadius: '5%' }}>
                                <Card.Img variant="top" src={require(`../Images/${report.image}`)} style={{ height: '300px', padding: '5px 5px', borderRadius: '5%' }} />
                                <Card.Body style={{ height: '120px' }}>
                                    <Card.Title style={{ fontSize: '22px', textAlign: 'center', marginTop: '10px', marginBottom: '15px' }}><span className="span" style={{ fontSize: '24px', fontWeight: '700' }}>{report.given_name} {report.surname}</span></Card.Title>

                                    <SightedModal report={report} />
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default Sighted;