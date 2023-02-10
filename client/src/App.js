import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Form,
  BrowserRouter
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

import Found from './pages/found-reports';
import Home from './pages/home';
import Landing from './pages/landing';
import Missing from './pages/missing-reports';
import Sighted from './pages/sighted-reports';
import Login from './pages/login';
import Register from './pages/register';
import Report from './pages/form-report';
import SingleReport from './pages/single-report';
import MissingReports from './pages/admin/missing';
import SightedReports from './pages/admin/sighted';
import FoundReports from './pages/admin/found';
import AdminDashboard from './pages/admin-dashboard';
import Users from './pages/admin/users';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // function that toggles true/false authentication
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const authLogin = (props) => {
    return !isAuthenticated ? (
      <Login {...props} setAuth={setAuth}  />
    ) : (
      <Navigate to="/home" />
    );
  };
  // function authenticate register
  const authReg = (props) => {
    return !isAuthenticated ? (
      <Register {...props} setAuth={setAuth}  />
    ) : (
      <Navigate to="/login" />
    );
  };

  // function authenticate home/dashboard
  const authHome = (props) => {
    return !isAuthenticated ? (
      <Home {...props} setAuth={setAuth}  />
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={authLogin()} />
          <Route path="/register" element={authReg()} />
          <Route path="/home" element={authHome()} />
          <Route path="/missing-reports" element={<Missing />} />
          <Route path="/sighted-reports" element={<Sighted />} />
          <Route path="/found-reports" element={<Found />} />
          <Route path="/form-report" element={<Report />} />
          <Route path="/single-report/:reportsid" element={<SingleReport />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin-missing" element={<MissingReports />} />
          <Route path="/admin-sighted" element={<SightedReports />} />
          <Route path="/admin-found" element={<FoundReports />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
