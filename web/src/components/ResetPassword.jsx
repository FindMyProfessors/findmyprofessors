import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

import { API_URL } from '../constants';

const containerStyle = {
  maxWidth: '85%',
  margin: '0 auto',
  marginTop: '100px'
}

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

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
    setSuccess('');

    if (!formData.password) {
      setError('Password is required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { password } = formData;

    try {
      console.log('Sending request with data:', { token, password }); // Debugging log
      const response = await fetch(`${API_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });

      if (response.ok) {
        setSuccess('Password Reset successful! Redirecting to login...');
        console.log('Password Reset successful'); // Debugging log
        setTimeout(() => {
          navigate('/Login'); // Redirect to login page after successful registration
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.log('Password Reset failed:', errorMessage); // Debugging log
      }
    } catch (error) {
      setError('An error occurred');
      console.log('An error occurred:', error); // Debugging log
    }
  }

  return (
    <>
      <Header />

      <style>{'body { background-color: #121212; }'}</style>
      <MDBContainer style={containerStyle}>
        <MDBCard style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#282828', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}>
          <MDBRow className='g-0'>
            <MDBCol md='0' style={{ backgroundColor: 'black' }}></MDBCol>
            <MDBCol md='12'>
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-row mt-2'>
                  <MDBIcon icon="search fa-3x me-3" style={{ color: 'white' }} />
                  <span className="h1 fw-bold mb-0" style={{ color: 'white' }}>Find My Professors</span>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', color: 'white' }}>
                  Please enter a new password
                </h5>
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='New password'
                    id='formControlLg'
                    type='password'
                    size="lg"
                    name="password"
                    labelClass="text-white"
                    contrast
                    onChange={handleChange}
                    value={formData.password}
                    style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Confirm password'
                    id='formControlLg'
                    type='password'
                    size="lg"
                    name="confirmPassword"
                    labelClass="text-white"
                    contrast
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                  <MDBBtn
                    type="submit"
                    className="mb-4 px-5"
                    size='lg'
                    style={{ backgroundColor: '#0082ca', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' }}>
                    Reset Password
                  </MDBBtn>
                </form>
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

export default ResetPassword;
