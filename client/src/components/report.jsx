import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { format } from 'date-fns'
import {
    FaUserAlt,
    FaFileAlt,
    FaCalendarAlt,
    FaUserFriends,
    FaMapMarkerAlt,
    FaLessThan
} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';

import '../pages/css/solo-report.css'
import Card from 'react-bootstrap/Card';
import SeenEdit from "../components/sighted-edit";
import FoundEdit from "../components/found-edit";
import { Button } from "react-bootstrap";

const SoloReport = ({ report }) => {
    const [reports, setReports] = useState({})

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

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
            localStorage.setItem("reportID", jsonData.reportsid)
            localStorage.setItem("image", jsonData.image)
            // const dateIsValid = (date) => {
            //   return !Number.isNaN(new Date(date).getTime());
            // }
            // console.log(dateIsValid(jsonData.seenwhen))
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
            <Button className="me-2 mb-2" onClick={() => handleShow(true)} style={{ marginLeft: '40%', marginTop: '15px' }}>
                View
            </Button>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton style={{backgroundColor: 'rgb(14, 40, 59)'}}>
                    <Modal.Title style={{fontSize: '28px', fontWeight: '700', color: 'antiquewhite', marginLeft: '5%'}}>Missing Person Report</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgb(225, 225, 225)'}}>
                    <div className="Solo" >
                        <Row className="bigRow">
                            <Col sm={8} className="colBig" >
                                <div className="headers"><FaUserAlt className="icons" />Missing Person's Details:</div>
                                <Row>
                                    <Col className="colSm">Name:<br></br> <span className="space">{report.given_name} {report.surname}</span></Col>
                                </Row>
                                <Row className="divider">
                                    <Col className="colSm">Nickname:<br></br> <span className="space">{report.nickname}</span></Col>
                                    <Col className="colSm">Age:<br></br> <span className="space">{report.age}</span></Col>
                                    <Col className="colSm">Gender:<br></br> <span className="space">{report.gender}</span></Col>
                                </Row>
                                <div className="headers"><FaFileAlt className="icons" />Description:</div>
                                <Row>
                                    <Col className="colSm">Height:<br></br> <span className="space">{report.height}</span></Col>
                                    <Col className="colSm">Weight:<br></br> <span className="space">{report.weight}</span></Col>
                                </Row>
                                <Row>
                                    <Col className="colSm">Hair Description:<br></br> <span className="space">{report.hair}</span></Col>
                                </Row>
                                <Row>
                                    <Col className="colSm">Clothes they are wearing in time of disappearance:<br></br> <span className="space">{report.clothes}</span></Col>
                                </Row>
                                <Row className="divider">
                                    <Col className="colSm">Distinguishing Characters:<br></br> <span className="space">{report.identifying_char}</span></Col>
                                </Row>
                                <div className="headers"><FaCalendarAlt className="icons" />Details on his/her disappearance:</div>
                                <Row className="divider">
                                    <Col className="colSm">Missing since:<br></br> <span className="space">{ format(new Date(report.seenwhen), 'MMMM dd, yyyy')}</span></Col>
                                    <Col className="colSm">Missing from:<br></br> <span className="space">{report.seenwhere}</span></Col>
                                </Row>
                                <div className="headers"><FaMapMarkerAlt className="icons" />Address of missing person:</div>
                                <Row>
                                    <Col className="colSm">House Number:<br></br> <span className="space">{report.house_no}</span></Col>
                                    <Col className="colSm">Street:<br></br> <span className="space">{report.street}</span></Col>
                                </Row>
                                <Row className="divider">
                                    <Col className="colSm">Barangay/Subdivision:<br></br> <span className="space">{report.barangay}</span></Col>
                                    <Col className="colSm">Municipality:<br></br> <span className="space">{report.municipality}</span></Col>
                                </Row>
                                <div className="headers"><FaUserFriends className="icons" />Person to contact:</div>
                                <Row className="divider">
                                    <Col className="colSm">Name:<br></br> <span className="space">{report.person}</span></Col>
                                    <Col className="colSm">Contact Number:<br></br> <span className="space">{report.contact_no}</span></Col>
                                </Row>
                                <Row>
                                    <Col className="reporter">Reported by: {report.first_name} {report.last_name}</Col>
                                </Row>
                                <Row>
                                    <Col className="buttonsss"><SeenEdit report={report} /></Col>
                                    <Col><FoundEdit report={report} /></Col>
                                </Row>
                            </Col>
                            <Col sm={4} className="colRight">
                        
                                <Row>
                                    <h1 className="name">{report.given_name} {report.surname}</h1>
                                </Row>
                                <Row>
                                    <Card.Img variant="top" src={require(`../Images/${report.image}`)} style={{ height: '450px', marginTop: '30px' }} />
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </Modal.Body>
            </Modal>


        </div>
    )
}
export default SoloReport