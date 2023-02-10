import Navbar from "../components/navbar";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./css/missing-reports.css"
import Container from 'react-bootstrap/Container';
import FoundModal from "../components/modal-found";


const Found = () => {
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/found",
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
        <div>
            <Navbar />
            <Container style={{ backgroundColor: 'rgba(0, 89, 153)', marginTop: '30px', paddingTop: '25px' }}>
                <h1 style={{ color: 'white' }}>People We Found</h1>
            </Container>
            <div className="cardHolder">
                {reports.map(report => (
                    <Card style={{ width: '22rem', border: '2px solid rgba(0, 51, 102)', marginBottom: '30px' }}>
                        <Card.Img variant="top" src={require(`../Images/${report.image}`)} style={{ height: '320px' }} />
                        <Card.Body style={{ backgroundColor: 'rgba(171, 215, 236)' }}>
                            <Card.Title style={{ fontSize: '22px', textAlign: 'center', marginTop: '10px' }}><span className="span" style={{ fontSize: '24px', fontWeight: '700' }}>{report.given_name} {report.surname}</span></Card.Title>
                            <Card.Text style={{ fontSize: '16px', color: 'black', textAlign: 'center' }}>
                                Age: <span className="span">{report.age}</span><br></br>

                            </Card.Text>
                            <FoundModal report = {report}/>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Found;
