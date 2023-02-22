import Navbar from "../components/navbar";
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from "react";
import "./css/missing-reports.css"

import SoloReport from "../components/report";
import NavbarWel from "../components/navbarWel";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SidebarUser from "../components/sideUsers";


const Missing = () => {
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/reports",
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
    // console.log(reports);

    return (
        <div className="missingAll">
            <NavbarWel />
            {/* <Filter/> */}
            <Row>
                <Col sm={3}> <SidebarUser /></Col>
                <Col sm={9} className="right">
                    <div className="MissingHeader">
                        <h1>People who are currently missing:</h1>
                    </div>
                    <div className="cardHolder">
                        {reports.map(report => (
                            <Card classname="card" style={{ width: '20rem', marginBottom: '30px', borderRadius: '5%' }}>
                                <Card.Img variant="top" src={require(`../Images/${report.image}`)} style={{ height: '300px', padding: '7px 10px', borderRadius: '5%' }} />
                                <Card.Body style={{ height: '120px' }}>
                                    <Card.Title style={{ textAlign: 'center', marginTop: '5px' }}><span className="span" style={{ fontSize: '24px', fontWeight: '700' }}>{report.given_name} {report.surname}</span></Card.Title>

                                    {/* <Button variant="primary" style={{ marginLeft: '40%', marginTop: '15px' }}><Link to={`/single-report/${report.reportsid}`} style={{color: 'white'}}>View</Link></Button> */}
                                    <SoloReport report={report} />
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>


        </div>
    )
}

export default Missing;