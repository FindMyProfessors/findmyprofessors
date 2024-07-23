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

import { API_URL } from '../constants';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!formData.username) {
      setError('Username is required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Invalid email address');
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { email, username, password } = formData;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        setSuccess('Registration successful! Redirecting to email verification...');
        setError('');

        // Send email confirmation
        await fetch(`${API_URL}/users/${data.user.id}/send-email-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          }
        });
        setTimeout(() => {
          navigate('/VerifyEmail'); // Redirect to email verification page
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred');
    }
  }

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    marginTop: '125px'
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
                  <MDBIcon
                  icon="search fa-3x me-3"
                  style={{ color: 'white' }}
                  />

                  <span className="h1 fw-bold mb-0" style={{ color: 'white' }}>Find My Professors</span>

                </div>

                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', color: 'white' }}>Register Now</h5>

                <form onSubmit={handleSubmit}>

                  <MDBInput
                  wrapperClass='mb-4' 
                  label='Username' 
                  id='formControlLg' 
                  size="lg" 
                  name="username" 
                  contrast
                  onChange={handleChange} 
                  value={formData.username} 
                  labelClass="text-white"
                  style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  />

                  <MDBInput
                  wrapperClass='mb-4' 
                  label='Email address' 
                  id='formControlLg' 
                  type='email' 
                  size="lg" 
                  name="email" 
                  contrast
                  onChange={handleChange} 
                  value={formData.email} 
                  labelClass="text-white"
                  style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  />

                  <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size="lg"
                  name="password"
                  contrast
                  onChange={handleChange}
                  value={formData.password}
                  labelClass="text-white"
                  style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  />

                  <MDBInput
                  wrapperClass='mb-4'
                  label='Confirm Password'
                  id='formControlLg'
                  type='password'
                  size="lg"
                  name="confirmPassword"
                  contrast
                  onChange={handleChange}
                  value={formData.confirmPassword}
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
                    Register
                  </MDBBtn>

                </form>

                <p
                  className="mb-5 pb-lg-2"
                  style={{ color: 'primary' }}>
                    Already have an account? <Link to="/Login" style={{ color: '#0082ca' }}>Login</Link>
                </p>

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

export default Register;
