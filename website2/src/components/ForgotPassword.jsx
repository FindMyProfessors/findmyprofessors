import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
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

const containerStyle = {
    maxWidth: '85%',
    margin: '0 auto',
    marginTop: '100px'
}

const ForgotPassword = () => {

    const navigate = useNavigate();

    const handleResetPassword = () => {
      navigate('/PasswordReset');
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
                    <MDBIcon icon="search fa-3x me-3" style={{ color: 'white' }}/>
                    <span className="h1 fw-bold mb-0"style={{color:'white'}}>Find My Professors</span>
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px', color:'white'}}>Forgot your password?</h5>

                  <MDBInput
                  wrapperClass='mb-4'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size="lg"
                  labelClass="text-white"
                  style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  />

                  <MDBBtn onClick={handleResetPassword} className="mb-4 px-5" color='dark' size='lg' style={{ backgroundColor: 'primary', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' }}>Reset Password</MDBBtn>
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

export default ForgotPassword;
