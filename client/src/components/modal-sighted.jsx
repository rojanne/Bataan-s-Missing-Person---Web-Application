import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns'

const SightedModal = ({ report }) => {
    const [lgShow, setLgShow] = useState(false);
    const [updatesighted, setUpdatesighted] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/report-sighted/${report.reportsid}`,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    updatesighted: JSON.stringify(updatesighted)
                }
            )
            const jsonData = await response.json();

            setUpdatesighted(jsonData);
            // console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getReports();
    }, []);

    // const finalDate = () => {
    //     return format(new Date(), 'MMMM dd, yyyy')
    //   }

    return (
        <div>
            <Button onClick={() => setLgShow(true)} style={{ marginLeft: '25%' }}>Sighted History</Button>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                style={{ marginTop: '10%' }}
            >
                <Modal.Header closeButton style={{ backgroundColor: 'rgb(14, 40, 59)' }}>
                    <Modal.Title id="example-modal-sizes-title-lg" style={{ fontWeight: '700', color: 'whitesmoke' }} >
                        Sighted History of {report.given_name} {report.surname}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgb(225, 225, 225)' }}>
                    <div style={{border: '1px solid white', padding: '1px 1px', borderRadius: '10px', boxShadow: '10px 10px 5px grey', backgroundColor: 'whitesmoke'}}>
                    <Table striped hover style={{ backgroundColor: "whitesmoke" }}>
                        <thead style={{ backgroundColor: 'rgb(65, 94, 114)', fontSize: '20px'}}>
                            <tr style={{color: 'aliceblue', fontSize: '18px'}}>
                                <th>Seen When</th>
                                <th>Time</th>
                                <th>Seen Where</th>
                                <th>Description</th>
                                <th>Reported by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {updatesighted.map(update => (
                                <tr key={update.reportid}>
                                    <td>{format(new Date(update.lastwhen), 'MMMM dd, yyyy')}</td>
                                    <td>{update.timeday}</td>
                                    <td>{update.lastwhere}</td>
                                    <td>{update.description}</td>
                                    <td>{update.first_name} {update.last_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                </Modal.Body>
            </Modal>



        </div>
    );

}
export default SightedModal