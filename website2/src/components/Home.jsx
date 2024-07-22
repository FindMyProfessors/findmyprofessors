import React from "react";
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
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader
    
} from 'mdb-react-ui-kit';

const containerStyle = {
  maxWidth: '85%',
  margin: '0 auto',
  marginTop: '40px'
}

const Home = () => {

    return (
    <>
        <Header />

        <style>{'body { background-color: #121212; }'}</style>

        <MDBContainer style={containerStyle}>
          <MDBCard style={{ maxWidth: '1400px', margin: '0 auto', backgroundColor: '#282828', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}>
            <MDBRow className='g-0'>
              <MDBCol md='0' style={{ backgroundColor: 'black' }}></MDBCol>
              <MDBCol md='12'>
                <MDBCardBody className='d-flex flex-column'>

                  <div className='d-flex flex-row mt-2 justify-content-center'>
                    <MDBIcon icon="search fa-4x me-4" style={{ color: 'white' }}/>
                    <span className="h1 fw-bold mb-4" style={{ fontSize: '4rem', color:'white' }}>Find My Professors</span>
                  </div>

                  <h5 className="fw-normal my-3 pb-0 text-center" style={{letterSpacing: '1px', color: '#DDDDDD'}}>
                    No more copy-pasting names into RateMyProfessors</h5>

                  <h5 className="fw-normal pb-5 text-center" style={{letterSpacing: '1px', color: '#DDDDDD'}}>
                    Use Find My Professors to find the best professors for you</h5>

                  <div className="d-flex justify-content-center">

                      <MDBBtn
                      color="primary"
                      size="lg"
                      className="me-5"
                      href='./Login'Login>
                          Get Started Now
                      </MDBBtn>

                      <MDBBtn
                      outline color ='primary'
                      style={{ backgroundColor: '#282828', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' }}
                      size="lg"
                      className="me-5"
                      href='./About'About>
                          Learn more
                      </MDBBtn>

                  </div>

                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
        
        
    </>
    );
};
 
export default Home;

