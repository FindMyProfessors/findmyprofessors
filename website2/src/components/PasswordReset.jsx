import React from 'react';
import { Link } from "react-router-dom";
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



const PasswordReset = () => {


  return (
    <>  
        <Header />
        <MDBContainer style={containerStyle}>
          <MDBCard style={{ maxWidth: '500px', margin: '0 auto' }}>
            <MDBRow className='g-0'>
              <MDBCol md='0' style={{ backgroundColor: 'black' }}></MDBCol>
              <MDBCol md='12'>
                <MDBCardBody className='d-flex flex-column'>
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon icon="search fa-3x me-3" style={{ color: '#000000' }}/>
                    <span className="h1 fw-bold mb-0">Find My Professors</span>
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>If you entered a valid email address, a recovery code will be sent to you. <Link to="/Login">Login</Link></h5>
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

export default PasswordReset;
