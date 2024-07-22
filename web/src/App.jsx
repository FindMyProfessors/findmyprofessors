import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import About from './components/About';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Cart from './components/Cart';
import VerifyEmail from './components/VerifyEmail';
import ResetPassword from './components/ResetPassword';

import logoBlack from './Logo-Black.JPG'; // Adjust path as necessary

function App() {
  return (
    <>
        <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/ContactUs" element={<ContactUs />} />
                    <Route path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route path="/PasswordReset" element={<PasswordReset />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/VerifyEmail" element={<VerifyEmail />} />
                    <Route path="/ResetPassword" element={<ResetPassword />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
      </>
  );
}

export default App;
