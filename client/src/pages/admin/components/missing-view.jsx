import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'
import {
    FaUserAlt,
    FaFileAlt,
    FaCalendarAlt,
    FaUserFriends,
    FaMapMarkerAlt
} from 'react-icons/fa'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ViewMissing = ({ report }) => {
    const [reports, setReports] = useState({})
    const [lgShow, setLgShow] = useState(false);

    // console.log(id);

    const getReports = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/reports/${report.reportsid}`,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    report: JSON.stringify(report)
                }
            )
            const jsonData = await response.json();
            setReports(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const finalDate = () => {
        return format(new Date(), 'MMMM dd, yyyy')
    }

    useEffect(() => {
        getReports();
    }, []);

    return (
        <div>
            <Button onClick={() => setLgShow(true)}>View</Button>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton style={{ backgroundColor: 'rgba(120, 162, 204)' }}>
                    <Modal.Title id="example-modal-sizes-title-lg" style={{ fontWeight: '600' }} >
                        Missing Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row className="bigRow" style={{width: '95%', marginLeft: '30px'}}>
                        <Col sm={8} className="colBig">
                            <div className="headers"><FaUserAlt className="icons" />Personal Details:</div>
                            <Row>
                                <Col className="colSm">Name: <span className="space">{report.given_name} {report.surname}</span></Col>
                            </Row>
                            <Row>
                                <Col className="colSm">Nickname: <span className="space">{report.nickname}</span></Col>
                                <Col className="colSm">Age: <span className="space">{report.age}</span></Col>
                                <Col className="colSm">Gender: <span className="space">{report.gender}</span></Col>
                            </Row>
                            <div className="headers"><FaFileAlt className="icons" />Description:</div>
                            <Row>
                                <Col className="colSm">Height: <span className="space">{report.height}</span></Col>
                                <Col className="colSm">Weight: <span className="space">{report.weight}</span></Col>
                            </Row>
                            <Row>
                                <Col className="colSm">Hair Description: <span className="space">{report.hair}</span></Col>
                            </Row>
                            <Row>
                                <Col className="colSm">Clothes they are wearing in time of disappearance: <span>{report.clothes}</span></Col>
                            </Row>
                            <Row>
                                <Col className="colSm">Distinguishing Characters: <span className="space">{report.identifying_char}</span></Col>
                            </Row>
                            <div className="headers"><FaCalendarAlt className="icons" />Details on his/her disappearance:</div>
                            <Row>
                                <Col className="colSm">Missing since: <span className="space">{ format(new Date(report.seenwhen), 'MMMM dd, yyyy')}</span></Col>
                                <Col className="colSm">Missing from: <span className="space">{report.seenwhere}</span></Col>
                            </Row>
                            <div className="headers"><FaMapMarkerAlt className="icons" />Address of missing person:</div>
                            <Row>
                                <Col className="colSm">House Number: <span className="space">{report.house_no}</span></Col>
                                <Col className="colSm">Street: <span className="space">{report.street}</span></Col>
                            </Row>
                            <Row>
                                <Col className="colSm">Barangay/Subdivision: <span className="space">{report.barangay}</span></Col>
                                <Col className="colSm">Municipality: <span className="space">{report.municipality}</span></Col>
                            </Row>
                            <div className="headers"><FaUserFriends className="icons" />Person to contact:</div>
                            <Row>
                                <Col className="colSm">Name: <span className="space">{report.person}</span></Col>
                                <Col className="colSm">Contact Number: <span className="space">{report.contact_no}</span></Col>
                            </Row>
                            <Row>
                                <Col className="reporter">Reported by: {report.first_name} {report.last_name}</Col>
                            </Row>

                        </Col>
                        <Col sm={4} className="colRight">
                            <Row>
                                <h1>{report.given_name} {report.surname}</h1>
                            </Row>
                            <Row>
                                <Card.Img variant="top" src={require(`../../../Images/${report.image}`)} style={{ height: '450px'}} />
                            </Row>
                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>
        </div>
    )


}
export default ViewMissing