import Sidebar from './sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarWel from '../../components/navbarWel';
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import './users.css'
import ViewFound from './components/found-view';


const FoundReports = () => {
    const [reports, setReports] = useState([])

    const getReports = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/found",
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
        toast('Report Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


        return (
            <div>
                <NavbarWel />
                <Row>
                    <Col sm={3}> <Sidebar /></Col>
                    <Col sm={9} className='Table'>
                        <h1 className='upheader'>Found Reports</h1>
                        <Table hover responsive className='table'>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Report ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Person to Contact</th>
                                    <th>View</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map(report => (
                                    <tr key={report.reportsid}>
                                        <td>{report.reportsid}</td>
                                        <td>{report.given_name} {report.surname}</td>
                                        <td>{report.age}</td>
                                        <td>{report.person}</td>
                                        <td><ViewFound report={report}/></td>
                                        <td><button className="btn btn-danger"
                                            onClick={() => deleteReport(report.reportsid)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
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
                    theme="dark"
                />
            </div>
        )
    
}
export default FoundReports