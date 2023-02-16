import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from '../components/navbar';
import "./css/form-report.css"
import Container from 'react-bootstrap/esm/Container';
import UploadPhoto from '../components/uploadImage';
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Report = () => {
    const [inputs, setInputs] = useState({
        image: "", surname: "", given_name: "", nickname: "", age: "", gender: "", height: "", weight: "",
        hair: "", clothes: "", identifying_char: "", seenwhen: "", seenwhere: "", person: "", relationship: "",
        contact_no: "", house_no: "", street: "", barangay: "", municipality: "", reporterid: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const { image, surname, given_name, nickname, age, gender, height, weight,
        hair, clothes, identifying_char, seenwhen, seenwhere, person, relationship,
        contact_no, house_no, street, barangay, municipality, reporterid } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const errors = validate(inputs)
            setFormErrors(errors);
            setIsSubmit(true);
            const body = {
                image: localStorage.getItem("image"), surname, given_name, nickname, age, gender, height, weight,
                hair, clothes, identifying_char, seenwhen, seenwhere, person, relationship,
                contact_no, house_no, street, barangay, municipality, reporterid: localStorage.getItem("userID")
            }
            // console.log(localStorage.getItem("image"))
            if (JSON.stringify(errors) === "{}") {
                const response = await fetch(
                    "http://localhost:8000/reports",
                    {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(body)
                    }
                )
                const parseRes = await response.json();
                toast.success('Form Submitted Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setInputs({
                    image: "", surname: "", given_name: "", nickname: "", age: "", gender: "", height: "", weight: "",
                    hair: "", clothes: "", identifying_char: "", seenwhen: "", seenwhere: "", person: "", relationship: "",
                    contact_no: "", house_no: "", street: "", barangay: "", municipality: ""
                });
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        //console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(inputs)
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.surname) {
            errors.surname = "Name is required!";
        }
        if (!values.given_name) {
            errors.given_name = "Name is required!";
        }
        if (!values.age) {
            errors.age = "Age is required!";
        }
        if (!values.seenwhen) {
            errors.seenwhen = "This is required!";
        }
        if (!values.seenwhere) {
            errors.seenwhere = "This is required!";
        }
        if (!values.person) {
            errors.person = "This is required!";
        }
        if (!values.relationship) {
            errors.relationship = "This is required!";
        }
        if (!values.contact_no) {
            errors.contact_no = "This is required!";
        }
        if (!values.barangay) {
            errors.barangay = "This is required!";
        }
        if (!values.municipality) {
            errors.municipality = "This is required!";
        }
        return errors;

    };

    return (
        <div>
            <Navbar />
            <Container style={{ marginLeft: "12%", marginTop: "5%", marginBottom: "0" }}>
                <h3 className='reportTitle'>Report a Missing Person Form</h3>
            </Container>
            <Form className="reportForm" onSubmit={onSubmitForm}>
                <h4 className='reportP'>Be truthful and provide as much detail as possible.</h4><br></br>
                <h6 className='reportH'>Please upload a high quality image of the missing person (ideally head & shoulders only)</h6>
                <UploadPhoto /><br></br>
                <h6>Personal Details</h6>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={given_name} name="given_name"
                            onChange={handleChange} />
                        <p>{formErrors.given_name}</p>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={surname} name="surname"
                            onChange={handleChange} />
                        <p>{formErrors.surname}</p>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNickname">
                        <Form.Label>Nickname/Alias</Form.Label>
                        <Form.Control type="text" placeholder="Enter nickname" value={nickname} name="nickname"
                            onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" value={age} name="age"
                            onChange={handleChange} />
                        <p>{formErrors.age}</p>
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
                        <Form.Control type="text" placeholder="Height in meters or feet" value={height} name="height"
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="text" placeholder="Weight in kilograms or pounds" value={weight} name="weight"
                            onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridHair">
                    <Form.Label>Hair Description</Form.Label>
                    <Form.Control placeholder="Length, color and type of hair" value={hair} name="hair"
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridClothes">
                    <Form.Label>The clothes they are wearing on time of disappearance</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Color or type e.g blue blouse and pants" value={clothes} name="clothes"
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridChar">
                    <Form.Label>Distinguish features useful for identification</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Distinguish features e.g moles, scars" value={identifying_char} name="identifying_char"
                        onChange={handleChange} />
                </Form.Group><br></br>

                <h6>Details on his/her disappearance:</h6>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridWhen">
                        <Form.Label>Date of Disappearance</Form.Label>
                        <Form.Control type="date" placeholder="Last seen when" value={seenwhen} name="seenwhen"
                            onChange={handleChange} />
                        <p>{formErrors.seenwhen}</p>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridWhere">
                        <Form.Label>Place of Disappearance</Form.Label>
                        <Form.Control type="text" placeholder="Last seen where" value={seenwhere} name="seenwhere"
                            onChange={handleChange} />
                        <p>{formErrors.seenwhere}</p>
                    </Form.Group>
                </Row><br></br>

                <h6>Address of the missing person:</h6>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridHouse">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control type="text" value={house_no} name="house_no"
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" value={street} name="street"
                            onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridBarangay">
                        <Form.Label>Barangay/Subdivision</Form.Label>
                        <Form.Control type="text" value={barangay} name="barangay"
                            onChange={handleChange} />
                        <p>{formErrors.barangay}</p>
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
                        <p>{formErrors.municipality}</p>
                    </Form.Group>
                </Row>

                <h6>Information for person to contact:</h6>
                <Form.Group as={Col} controlId="formGridPerson">
                    <Form.Label>Person to contact:</Form.Label>
                    <Form.Control type="text" placeholder='Enter full name' value={person} name="person"
                        onChange={handleChange} />
                    <p>{formErrors.person}</p>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridRelationship">
                    <Form.Label>Relationship to missing person:</Form.Label>
                    <Form.Control type="text" placeholder='Friend/Mother/Wife' value={relationship} name="relationship"
                        onChange={handleChange} />
                    <p>{formErrors.relationship}</p>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridContact">
                    <Form.Label>Contact Number:</Form.Label>
                    <Form.Control type="text" placeholder='09---------' value={contact_no} name="contact_no"
                        onChange={handleChange} />
                    <p>{formErrors.contact_no}</p>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <ToastContainer
                    position="top-right"
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
                {/* Same as */}
                <ToastContainer />
            </Form>
        </div>
    );
}

export default Report;