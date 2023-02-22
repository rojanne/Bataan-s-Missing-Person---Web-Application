import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../pages/css/found-edit.css'


const FoundEdit = ({ report }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs, setInputs] = useState({
        reporterid: "", seenwhen: "", seenwhere: ""
    });
    const user_id = localStorage.getItem("userID")

    const { seenwhen, seenwhere, reporterid } = inputs

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    // const { seenwhen } = seenwhen
    const updateReport = async (e) => {
        // console.log("hello");
        console.log(report.reporterid)
        console.log(localStorage.getItem("userID"))
        e.preventDefault();
        if (user_id == report.reporterid) {
            try {
                const body = { seenwhen, seenwhere, reporterid: report.reporterid };
                const response = await fetch(
                    `http://localhost:8000/found/${report.reportsid}`,
                    {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(body)
                    }
                );
                const parseRes = await response.json()
                //   console.log(parseRes)

            } catch (err) {
                console.error(err.message);
            }
            toast.success('Report submitted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setInputs({seenwhen: "", seenwhere: ""})
            window.location.reload()
        } else {
            toast.warn(`Oooops, sorry. You can't report this. Only the one who made the missing report can submit this. Thank you!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Have you found them already?
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{backgroundColor: 'rgb(65, 94, 114)'}}>
                    <Modal.Title style={{color: 'white'}}>Please provide the details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="formFound">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>When did you found them?</Form.Label>
                            <Form.Control
                                type="date"
                                value={seenwhen}
                                name="seenwhen"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Where did you found them?</Form.Label>
                            <Form.Control
                                type="text"
                                value={seenwhere}
                                name="seenwhere"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateReport}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default FoundEdit