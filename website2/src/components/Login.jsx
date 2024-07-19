import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const { username, password } = formData;

    try {
      console.log('Sending request with data:', { username, password }); // Debugging log
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data); // Debugging log
        navigate('/Dashboard'); // Redirect to Dashboard page after successful login
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.log('Login failed:', errorMessage); // Debugging log
      }
    } catch (error) {
      setError('An error occurred');
      console.log('An error occurred:', error); // Debugging log
    }
  }

  const containerStyle = {
    width: '1200px',
    margin: '0 auto',
    marginTop: '150px'
  }

  return (
    <>
      <Header />
      
      <MDBContainer style={containerStyle}>
        <MDBCard>
          <MDBRow className='g-0'>
            <MDBCol md='6' style={{ backgroundColor: 'black' }}></MDBCol>
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-row mt-2'>
                  <MDBIcon icon="search fa-3x me-3" style={{ color: '#000000' }}/>
                  <span className="h1 fw-bold mb-0">Find My Professors</span>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                <form onSubmit={handleSubmit}>
                  <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='username' size="lg" name="username" onChange={handleChange} value={formData.username} />
                  <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" name="password" onChange={handleChange} value={formData.password} />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <MDBBtn type="submit" className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                </form>
                <a className="small text-muted"><Link to="/ForgotPassword">Forgot Password?</Link></a>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to="/Register">Register</Link></p>
                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default Login;
