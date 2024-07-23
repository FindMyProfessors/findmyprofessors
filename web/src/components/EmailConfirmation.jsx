import React, { useEffect } from 'react';
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
} from 'mdb-react-ui-kit';

import { API_URL } from '../constants';

const containerStyle = {
  maxWidth: '85%',
  margin: '0 auto',
  marginTop: '100px',
}

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const confirmEmail = async () => {
      if (token) {
        await fetch(`${API_URL}/users/confirm-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        setTimeout(() => {
          navigate('/Login'); // Redirect to login
        }, 5000); // Wait for 5 seconds before redirecting
      }
    };
    confirmEmail();
  }, [token, navigate]);

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
                <h5 className="fw-normal my-4 pb-0" style={{ letterSpacing: '1px', color: 'white' }}>
                  Your email has been confirmed. Redirecting to login ...
                </h5>
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

export default EmailConfirmation;
