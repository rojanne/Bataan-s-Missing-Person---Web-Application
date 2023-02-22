import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ViewFound = ({report}) => {
    const [lgShow, setLgShow] = useState(false);
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/reports/${report.reportsid}`,
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

    const finalDate = () => {
        return format(new Date(), 'MMMM dd, yyyy')
    }

    return (
        <div>
            <Button onClick={() => setLgShow(true)}>View</Button>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                style={{ marginTop: '10%' }}
            >
                <Modal.Header closeButton style={{ backgroundColor: 'rgb(65, 94, 114)' }}>
                    <Modal.Title id="example-modal-sizes-title-lg" style={{ fontWeight: '600', color: 'white'  }} >
                        Found Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgb(225, 225, 225)' }}>

                    <Card style={{ width: '68rem', border: '1px solid' }}>
                        <Card.Header style={{fontSize: '22px',color: 'aliceblue', fontWeight:'500', textAlign: 'center', backgroundColor: 'rgb(65, 94, 114)'}}>{report.given_name} {report.surname}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{ fontWeight: '500' }}>Found When: <span style={{ marginLeft: '40px', fontWeight: '400' }}>
                            { format(new Date(report.seenwhen), 'MMMM dd, yyyy')}
                            </span></ListGroup.Item>
                            <ListGroup.Item style={{ fontWeight: '500' }}>Found Where: <span style={{ marginLeft: '40px', fontWeight: '400' }}>
                                {reports.seenwhere}</span>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ fontWeight: '500' }}>Found by: <span style={{ marginLeft: '40px', fontWeight: '400' }}>
                                {reports.first_name} {reports.last_name}</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <div style={{ backgroundColor: '#BAA782', textAlign: 'center', padding:'15px 0',fontWeight: '500', width: '68rem', fontSize: '18px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                        We are so happy that we already found {reports.given_name} {reports.surname}. Thank you for trusting Missing People Application.
                        </div>

                </Modal.Body>
            </Modal>



        </div>
    )
}
export default ViewFound