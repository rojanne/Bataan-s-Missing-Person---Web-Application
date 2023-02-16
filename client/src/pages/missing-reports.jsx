import Navbar from "../components/navbar";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./css/missing-reports.css"
import Container from 'react-bootstrap/Container';
import Filter from "../components/filter";


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
            <Navbar />
            {/* <Filter/> */}
            <Container style={{backgroundColor: 'rgb(8, 11, 53)', marginTop: '30px', paddingTop: '20px' }}>
                <h1 style={{ color: 'rgb(225, 245, 243)', fontSize: '32px' }}>People who are currently missing:</h1>
            </Container>
            <div className="cardHolder">
                {reports.map(report => (
                    <Card classname="card" style={{ width: '20rem', border: '4px solid rgb(8, 11, 53)' , marginBottom: '30px'}}>
                        <Card.Img variant="top" src={require(`../Images/${report.image}`)} style={{ height: '300px' }} />
                        <Card.Body style={{ backgroundColor: 'rgb(201, 233, 245)', height: '120px'}}>
                            <Card.Title style={{textAlign: 'center', marginTop: '5px' }}><span className="span" style={{ fontSize: '24px', fontWeight: '700' }}>{report.given_name} {report.surname}</span></Card.Title>
                            
                            <Button variant="primary" style={{ marginLeft: '40%', marginTop: '15px' }}><Link to={`/single-report/${report.reportsid}`} style={{color: 'white'}}>View</Link></Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>


        </div>
    )
}

export default Missing;