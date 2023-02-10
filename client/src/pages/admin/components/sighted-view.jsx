import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns'


const ViewSighted = ({report}) => {
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

    return (
        <div>
            <Button onClick={() => setLgShow(true)}>View</Button>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                style={{marginTop: '10%'}}
            >
                <Modal.Header closeButton style={{backgroundColor: 'rgba(120, 162, 204)'}}>
                    <Modal.Title id="example-modal-sizes-title-lg" style={{fontWeight: '600'}} >
                        Sighted History
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Table striped bordered hover style={{backgroundColor: "whitesmoke"}}>
                <thead> 
                    <tr>
                        <th>Seen When</th>
                        <th>Time of day</th>
                        <th>Seen Where</th>
                        <th>Description</th>
                        <th>Reported by</th>
                    </tr>
                </thead>
                <tbody>
                    {updatesighted.map(update => (
                         <tr key={update.reportid}>
                         <td>{ format(new Date(update.lastwhen), 'MMMM dd, yyyy')}</td>
                         <td>{update.timeday}</td>
                         <td>{update.lastwhere}</td>
                         <td>{update.description}</td>
                         <td>{update.first_name} {update.last_name}</td>
                     </tr>
                    ))}                  
                </tbody>
            </Table>
                </Modal.Body>
            </Modal>   
        </div>
    );

}
export default ViewSighted