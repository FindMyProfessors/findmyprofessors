import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/users/send-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSuccess('If you entered a valid email address, a recovery link will be sent to you.');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

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
                  Enter your email address to receive a password reset link.
                </h5>
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Email address'
                    id='formControlLg'
                    type='email'
                    size="lg"
                    name="email"
                    contrast
                    onChange={handleChange}
                    value={email}
                    labelClass="text-white"
                    style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                  <MDBBtn
                    type="submit"
                    className="mb-4 px-5"
                    size='lg'
                    style={{ backgroundColor: '#0082ca', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' }}>
                    Send Reset Link
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default ForgotPassword;
