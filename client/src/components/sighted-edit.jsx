import React, { Fragment, useState } from "react";
import 'jquery/dist/jquery.min.js'; // Have to install and import jQuery because of bootstrap modal's dependency
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const SeenEdit = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs, setInputs] = useState({
        reportid: "", timeday: "", lastwhen: "", lastwhere: "", description: "", reporterid: ""
    });
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const { reportid, timeday, lastwhen, lastwhere, description, reporterid } = inputs


    const sightedReport = async (e) => {
        // console.log("hello");
        e.preventDefault();
        try {
            const body = { reportid: localStorage.getItem("reportID"), timeday, lastwhen, lastwhere, description, reporterid: localStorage.getItem("userID") };
            const response = await fetch(
                `http://localhost:8000/report-sighted`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json()
            console.log(parseRes)

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Have you seen them?
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please provide the details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>When did you see them?</Form.Label>
                            <Form.Control
                                type="date"
                                value={lastwhen}
                                name="lastwhen"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Where did you see them?</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastwhere}
                                name="lastwhere"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>What time did you see them?</Form.Label>
                            <Form.Control
                                type="text"
                                value={timeday}
                                name="timeday"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Can you describe them?</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} name="description" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sightedReport}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SeenEdit;