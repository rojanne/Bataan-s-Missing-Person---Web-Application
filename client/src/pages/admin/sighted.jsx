import Sidebar from './sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './users.css'
import NavbarWel from '../../components/navbarWel';
import ViewSighted from './components/sighted-view';



const SightedReports = () => {
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/sighted",
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
        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getReports();
    }, []);

    const deleteReport = async id => {
        try {
          const deleteReport = await fetch(`http://localhost:8000/reports/${id}`, {
            method: "DELETE"
          });
    
          setReports(reports.filter(report => report.reportsid !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

    return(
        <div>
        <NavbarWel/>
        <Row>
            <Col sm={3}> <Sidebar /></Col>
            <Col sm={9} className='Table'>
            <h1 className='upheader'>Sighted Person Reports</h1>
            <Table responsive >
                <thead className='theHead'>
                    <tr>
                        <th>Report ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Person to Contact</th>
                        <th>Action</th>
                                            
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.reportsid}>
                            <td>{report.reportsid}</td>
                            <td>{report.given_name} {report.surname}</td>
                            <td>{report.age}</td>
                            <td>{report.person}</td>
                            <td style={{display: 'flex', gap: '10px'}}><ViewSighted className="some" report={report}/><button className="btn btn-danger"
                                onClick={() => deleteReport(report.reportsid)}>Delete</button></td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Col>
        </Row>
        
    </div>
    )
}
export default SightedReports