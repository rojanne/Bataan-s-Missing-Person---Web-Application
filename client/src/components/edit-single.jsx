import React, { Fragment, useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";

const EditSingle = ({ report }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs, setInputs] = useState({
        surname: report.surname, given_name: report.given_name, nickname: report.nickname, age: report.age, gender: report.gender, height: report.height, weight: report.weight,
        hair: report.hair, clothes: report.clothes, identifying_char: report.identifying_char, seenwhen: report.seenwhen, seenwhere: report.seenwhere, person: report.person, relationship: report.relationship,
        contact_no: report.contact_no, house_no: report.house_no, street: report.street, barangay: report.barangay, municipality: report.municipality
    });

    // const [given_name, setGivenname] = useState(report.given_name)
    // const [surname, setSurname] = useState(report.surname)
    // const [nickname, setNickname] = useState(report.nickname)
    // const [age, setAge] = useState(report.age)
    // const [height, setHeight] = useState(report.height)
    // const [weight, setWeight] = useState(report.weight)
    // const [hair, setHair] = useState(report.hair)
    // const [clothes, setClothes] = useState(report.clothes)
    // const [identifying_char, setIdentifyingChar] = useState(report.identifying_char)
    // const [seenwhen, setSeenwhen] = useState(report.seenwhen)
    // const [seenwhere, setSeenwhere] = useState(report.seenwhere)
    // const [person, setPerson] = useState(report.person)
    // const [relationship, setRelationship] = useState(report.relationship)
    // const [contact_no, setContact_no] = useState(report.contact_no)
    // const [house_no, setHouse_no] = useState(report.house_no)
    // const [street, setStreet] = useState(report.street)
    // const [barangay, setBarangay] = useState(report.barangay)
    // const [municipality, setMunicipality] = useState(report.municipality)



    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const { surname, given_name, nickname, age, gender, height, weight,
        hair, clothes, identifying_char, seenwhen, seenwhere, person, relationship,
        contact_no, house_no, street, barangay, municipality} = inputs


    const user_id = localStorage.getItem("userID")

    const onSubmit = async (e) => {
        e.preventDefault()
        if (user_id == report.reporterid) {
            try {
             
                const body = {
                    surname, given_name, nickname, age, height, weight, hair, clothes, identifying_char, seenwhen,
                    seenwhere, person, relationship, contact_no, house_no, street, barangay, municipality
                }



                const response = await fetch(
                    `http://localhost:8000/reports/${report.reportsid}`,
                    {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(body)
                    }
                );
                toast.success('Report Updated!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } catch (err) {
                console.error(err.message);
            }
        } else {
            toast.warn(`Oooops, sorry. You can't report this. Only the one who made the missing report can edit the report. Thank you!`, {
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
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Please provide the details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="reportForm">
                        <h6>Personal Details</h6>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text"  value={given_name} name="given_name"
                                    onChange={handleChange} />
                               
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={surname} name="surname"
                                    onChange={handleChange} />
                               
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNickname">
                                <Form.Label>Nickname/Alias</Form.Label>
                                <Form.Control type="text"  value={nickname} name="nickname"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number"  value={age} name="age"
                                    onChange={handleChange} />
                               
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="Default select example" value={gender} name="gender" onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </Form.Select>
                            </Form.Group>
                        </Row> <br></br>

                        <h6>Description of the missing person:</h6>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridHeight">
                                <Form.Label>Height</Form.Label>
                                <Form.Control type="text" value={height} name="height"
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridWeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="text"  value={weight} name="weight"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridHair">
                            <Form.Label>Hair Description</Form.Label>
                            <Form.Control  value={hair} name="hair"
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridClothes">
                            <Form.Label>The clothes they are wearing on time of disappearance</Form.Label>
                            <Form.Control as="textarea" rows={3}  value={clothes} name="clothes"
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridChar">
                            <Form.Label>Distinguish features useful for identification</Form.Label>
                            <Form.Control as="textarea" rows={4}  value={identifying_char} name="identifying_char"
                                onChange={handleChange} />
                        </Form.Group><br></br>

                        <h6>Details on his/her disappearance:</h6>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridWhen">
                                <Form.Label>Date of Disappearance</Form.Label>
                                <Form.Control type="date"  value={seenwhen} name="seenwhen"
                                    onChange={handleChange} />
                                
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridWhere">
                                <Form.Label>Place of Disappearance</Form.Label>
                                <Form.Control type="text"  value={seenwhere} name="seenwhere"
                                    onChange={handleChange} />
                                
                            </Form.Group>
                        </Row><br></br>

                        <h6>Address of the missing person:</h6>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridHouse">
                                <Form.Label>House Number</Form.Label>
                                <Form.Control type="text" value={house_no}  name="house_no"
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStreet">
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" value={street}  name="street"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridBarangay">
                                <Form.Label>Barangay/Subdivision</Form.Label>
                                <Form.Control type="text" value={barangay}  name="barangay"
                                    onChange={handleChange} />
                              
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMunicipality">
                                <Form.Label>Municipality</Form.Label>
                                <Form.Select aria-label="Default select example" value={municipality} name="municipality" 
                                    onChange={handleChange}>
                                    <option value="">Select Municipality</option>
                                    <option value="Abucay">Abucay</option>
                                    <option value="Bagac">Bagac</option>
                                    <option value="Balanga">Balanga</option>
                                    <option value="Dinalupihan">Dinalupihan</option>
                                    <option value="Hermosa">Hermosa</option>
                                    <option value="Limay">Limay</option>
                                    <option value="Mariveles">Mariveles</option>
                                    <option value="Morong">Morong</option>
                                    <option value="Orani">Orani</option>
                                    <option value="Orion">Orion</option>
                                    <option value="Pilar">Pilar</option>
                                    <option value="Samal">Samal</option>
                                </Form.Select>
                               
                            </Form.Group>
                        </Row>

                        <h6>Information for person to contact:</h6>
                        <Form.Group as={Col} controlId="formGridPerson">
                            <Form.Label>Person to contact:</Form.Label>
                            <Form.Control type="text" placeholder='Enter full name' value={person} name="person"
                                onChange={handleChange} />
                        
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRelationship">
                            <Form.Label>Relationship to missing person:</Form.Label>
                            <Form.Control type="text" placeholder='Friend/Mother/Wife' value={relationship} name="relationship"
                                onChange={handleChange} />
                            
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridContact">
                            <Form.Label>Contact Number:</Form.Label>
                            <Form.Control type="text" placeholder='09---------' value={contact_no} name="contact_no"
                                onChange={handleChange} />
                           
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

)
}
export default EditSingle;