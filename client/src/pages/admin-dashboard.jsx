import Sidebar from "./admin/sidebar"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarWel from "../components/navbarWel";


const AdminDashboard = () => {

    return (
        <div>
            <NavbarWel/>
            <Row>
                <Col sm={3}> <Sidebar /></Col>
                <Col sm={9}><h1>Welcome</h1></Col>
            </Row>
            
        </div>
    )
}
export default AdminDashboard