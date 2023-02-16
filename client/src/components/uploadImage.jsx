import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const UploadPhoto = () => {
    const [image, setImage] = useState({})

    const fileOnChange = (e) => {
        setImage(e.target.files[0])
        console.log(image)
    }

    const sendImage = async (e) => {
        e.preventDefault()
        try {

            let formData = new FormData()

            formData.append("my-image", image)

            const newImage = await fetch(`http://localhost:8000/upload`, {
                method: "POST",
                body: formData
            })
            const parseRes = await newImage.json()
            // console.log(parseRes)
            localStorage.setItem("image", parseRes)
            if (parseRes) {
                toast.info('Image Uploaded', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Please upload an image!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }


        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <div>
            <Form.Group controlId="formFile" className="mb-3">
            <Row>
                <Col ><Form.Control type="file" onChange={fileOnChange} /></Col>
                <Col ><button className="button-upload btn btn-primary" onClick={sendImage}>Upload</button></Col>
                </Row>
            </Form.Group>
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

export default UploadPhoto