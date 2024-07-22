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

const Home = () => {



    return (
    <>
        <Header />

        <style>{'body { background-color: #121212; }'}</style>
        <MDBContainer fluid className="p-5 text-white text-center" style={{ backgroundColor: '#121212'}}>
          <h2 className="display-4 fw-bold">
            Find My Professors
          </h2>
          <p className="lead my-4">
            Find My Professors is a site that allows students to search for the professors by the course that they want to take, instead of by the professor. This will enable students to save time manually searching for the best professor by using our site which runs an in-depth rating analysis on each professor and presents all the relevant data to you. No more copy-pasting names into RateMyProfessors; use FindMyProfessors to find the best professors.
          </p>
          <div className="d-flex justify-content-center">

            <MDBBtn color="primary" className="me-2"href='/'Login>
              Login
            </MDBBtn>

            <MDBBtn color="primary" className="me-2" href='/'Register>
              Register
            </MDBBtn>

          </div>
        </MDBContainer>
    
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol md="4" className="mb-4 text-center">
          <MDBIcon icon="fas fa-magnifying-glass" size="3x" className="mb-3 text-primary"/>
          <h5 className="fw-bold" style={{ color: 'white' }}>Search by course</h5>
          <p style={{ color: 'white' }}>
            Search courses straight from your university. No more using inefficient school websites from 2004. 
          </p>
        </MDBCol>
        
        <MDBCol md="4" className="mb-4 text-center">
          <MDBIcon icon="fa fa-chart-bar" size="3x" className="mb-3 text-primary"/>
          <h5 className="fw-bold" style={{ color: 'white' }}>Compare Professors</h5>
          <p style={{ color: 'white' }}>
            Compare professors using filters such as average grade, difficulty, quality, and more.
          </p>
        </MDBCol>
        
        <MDBCol md="4" className="mb-4 text-center">
          <MDBIcon icon="fas fa-chart-line" size="3x" className="mb-3 text-primary"/>
          <h5 className="fw-bold" style={{ color: 'white' }}>See Data</h5>
          <p style={{ color: 'white' }}>
            See the data about professors searched such as rating over time and professor feedback from former students. 
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
    );
};
 
export default Home;

