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
        <div className="missingAll">
            <Navbar />
            <Container style={{backgroundColor: 'rgb(8, 11, 53)', marginTop: '30px', paddingTop: '20px' }}>
                <h1 style={{ color: 'rgb(225, 245, 243)',  fontSize: '32px' }}>People We Found</h1>
            </Container>
            <div className="cardHolder">
                {reports.map(report => (
                    <Card style={{ width: '20rem', border: '4px solid rgb(8, 11, 53)' , marginBottom: '30px'}}>
                        <Card.Img variant="top" src={require(`../Images/${report.image}`)} style={{ height: '300px' }} />
                        <Card.Body style={{ backgroundColor: 'rgb(201, 233, 245)', height: '120px'}}>
                            <Card.Title style={{ fontSize: '22px', textAlign: 'center', marginTop: '10px', marginBottom: '15px' }}><span className="span" style={{ fontSize: '24px', fontWeight: '700' }}>{report.given_name} {report.surname}</span></Card.Title>
                            
                            <FoundModal report = {report}/>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Found;
