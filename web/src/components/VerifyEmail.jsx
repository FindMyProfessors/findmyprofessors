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

const VerifyEmail = () => {

    const navigate = useNavigate();

    return (
    <>  
        <Header />

        <style>{'body { background-color: #121212; }'}</style>
        <MDBContainer
        style={containerStyle}>

          <MDBCard
          style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#282828', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}>

            <MDBRow
            className='g-0'>

              <MDBCol
              md='0'
              style={{ backgroundColor: 'black' }}>
              </MDBCol>

              <MDBCol
              md='12'>

                <MDBCardBody
                className='d-flex flex-column'>

                  <div
                  className='d-flex flex-row mt-2'>

                    <MDBIcon
                    icon="search fa-3x me-3"
                    style={{ color: 'white' }}/>

                    <span
                    className="h1 fw-bold mb-0"
                    style={{color:'white'}}>
                      Find My Professors
                    </span>
                  </div>

                  <h5
                  className="fw-normal my-4 pb-0"
                  style={{letterSpacing: '1px', color:'white'}}>
                    An email was sent to you. Check your email to verify your account.
                  </h5>

                
                  <div
                  className='d-flex flex-row justify-content-start'>

                    <a
                    href="#!"
                    className="small text-muted me-1">
                      Terms of use.
                    </a>

                    <a
                    href="#!"
                    className="small text-muted">
                      Privacy policy
                    </a>

                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </>
  );
}

export default VerifyEmail;
