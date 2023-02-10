import Navbar from "../components/navbar";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./css/missing-reports.css"
import Container from 'react-bootstrap/Container';
import SightedModal from "../components/modal-sighted";


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

    return(
        <div>
        <Navbar />
        <Container style={{ backgroundColor: 'rgba(0, 89, 153)', marginTop: '30px', paddingTop: '25px' }}>
            <h1 style={{ color: 'white' }}>Missing People who have been sighted but still not found.</h1>
        </Container>
        <div className="cardHolder">
            {reports.map(report => (
                <Card style={{ width: '22rem', border: '2px solid rgba(0, 51, 102)' , marginBottom: '30px'}}>
                    <Card.Img variant="top" src={require(`../Images/${report.image}`)} style={{ height: '320px' }} />
                    <Card.Body style={{ backgroundColor: 'rgba(171, 215, 236)' }}>
                        <Card.Title style={{ fontSize: '22px', textAlign: 'center', marginTop: '10px' }}><span className="span" style={{ fontSize: '24px', fontWeight: '700' }}>{report.given_name} {report.surname}</span></Card.Title>
                        <Card.Text style={{ fontSize: '16px', color: 'black', textAlign: 'center' }}>
                            Age: <span className="span">{report.age}</span><br></br>

                        </Card.Text>
                        <SightedModal report = {report}/>
                    </Card.Body>
                </Card>
            ))}
        </div>


    </div>
    )
}

export default Sighted;