import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const FoundModal = () => {
    const [lgShow, setLgShow] = useState(false);
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/reports/${localStorage.getItem("reportID")}`,
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
            // console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getReports();
    }, []);

    return (
        <div>
            <Button onClick={() => setLgShow(true)} style={{ marginLeft: '25%' }}>View Sighted History</Button>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                style={{ marginTop: '10%' }}
            >
                <Modal.Header closeButton style={{ backgroundColor: 'rgba(120, 162, 204)' }}>
                    <Modal.Title id="example-modal-sizes-title-lg" style={{ fontWeight: '600' }} >
                        Found Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col sm={8}>
                            <Row>Found When: <span>{reports.seenwhen}</span></Row>
                            <Row>Found Where: <span>{reports.seenwhere}</span></Row>
                            <Row>Found by: <span>{reports.first_name} {reports.last_name}</span></Row>
                        </Col>
                        <Col sm={4}>We are so happy that we have found {reports.given_name} {reports.surname}.</Col>
                    </Row>
                </Modal.Body>
            </Modal>



        </div>
    );

}
export default FoundModal