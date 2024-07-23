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

  const sectionStyle = {
    paddingTop: '35px',
    paddingBottom: '0',
    marginTop: '0px'
};

const sectionStyle2 = {
    paddingTop: '0px',
    paddingBottom: '0',
    marginTop: '0px',
    width: '100%',
    height: '100%',
    margin: '0 auto'
};

const textStyle ={
    textAlign: 'center',
    marginTop: '30px'
}

const containerStyle = {
    maxWidth: '85%',
    margin: '0 auto',
    marginTop: '10px'
}

    return (
    <>
        <Header />

        <style>{'body { background-color: #FFFFFF; }'}</style>

        <MDBContainer
        style={containerStyle}>

          <MDBCard
          style={{ maxWidth: '1800px', margin: '0 auto', backgroundColor: '#282828', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}>

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
                  className='d-flex flex-row mt-2 justify-content-center'>

                    <MDBIcon
                    icon="search fa-4x me-4"
                    style={{ color: 'white' }}/>

                    <span
                    className="h1 fw-bold mb-4"
                    style={{ fontSize: '4rem', color:'white' }}>
                      Find My Professors
                    </span>

                  </div>

                  <h5
                  className="fw-normal my-3 pb-0 text-center"
                  style={{letterSpacing: '1px', color: '#DDDDDD'}}>
                    No more copy-pasting names into RateMyProfessors
                  </h5>

                  <h5
                  className="fw-normal pb-5 text-center"
                  style={{letterSpacing: '1px', color: '#DDDDDD'}}>
                    Use Find My Professors to find the best professors for you
                  </h5>

                  <div
                  className="d-flex justify-content-center">

                      <MDBBtn
                      color="primary"
                      size="lg"
                      className="me-5"
                      href='./Login'Login>
                          Get Started Now
                      </MDBBtn>

                      <MDBBtn
                      outline color ='primary'
                      style={{ backgroundColor: '#282828', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', color:'white' }}
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

          <MDBCol md='12'>

              <MDBCardBody
              className='d-flex flex-column'>

                  <MDBRow
                  className ="mb-0">

                      <MDBCol
                      md="2"
                      style={sectionStyle}>

                          <MDBCard
                          className='h-100'
                          style={{backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)'}}>

                              <MDBCardImage
                              src='https://i.imgur.com/j4QoUgR.png'
                              position='top'
                              alt='...'
                              />

                              <MDBCardBody>

                                  <MDBCardTitle
                                  style={{ color: 'white' }}>
                                      Overall Quality
                                  </MDBCardTitle>

                                  <MDBCardText
                                  style={{ color: 'white' }}>
                                      See the average rating students give to each professor
                                  </MDBCardText>

                              </MDBCardBody>

                          </MDBCard>

                      </MDBCol>

                      <MDBCol
                      md="2"
                      style={sectionStyle}>

                          <MDBCard className='h-100' style={{backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)'  }}>

                              <MDBCardImage
                              src='https://i.imgur.com/YYboB11.png'
                              position='top'
                              alt='...'/>

                              <MDBCardBody>

                                  <MDBCardTitle
                                  style={{ color: 'white' }}>
                                      Average Grade
                                  </MDBCardTitle>

                                  <MDBCardText
                                  style={{ color: 'white' }}>
                                      See the average Grade students received by each professor
                                  </MDBCardText>
                              </MDBCardBody>
                          </MDBCard>
                      </MDBCol>

                      <MDBCol
                      md="2"
                      style={sectionStyle}>

                          <MDBCard
                          className='h-100'
                          style={{backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)'}}>

                              <MDBCardImage
                              src='https://i.imgur.com/2sNQteW.png'
                              position='top'
                              alt='...'/>

                              <MDBCardBody>

                                      <MDBCardTitle
                                      style={{ color: 'white' }}>
                                          Difficulty
                                      </MDBCardTitle>

                                      <MDBCardText
                                      style={{ color: 'white' }}>
                                          See the average difficulty students rated each professor
                                      </MDBCardText>

                              </MDBCardBody>
                          </MDBCard>
                      </MDBCol>

                      <MDBCol
                      md="2"
                      style={sectionStyle}>

                          <MDBCard
                          className='h-100'
                          style={{backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)'}}>

                              <MDBCardImage
                              src='https://i.imgur.com/TOYrhFO.png'
                              position='top'
                              alt='...' />

                              <MDBCardBody>

                                  <MDBCardTitle
                                  style={{ color: 'white' }}>
                                      Would take again
                                  </MDBCardTitle>

                                  <MDBCardText
                                  style={{ color: 'white' }}>
                                      See the percentage of students who would take each professor again
                                  </MDBCardText>

                              </MDBCardBody>
                          </MDBCard>
                      </MDBCol>

                      <MDBCol
                      md="2"
                      style={sectionStyle}>

                          <MDBCard
                          className='h-100'
                          style={{backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)'}}>

                              <MDBCardImage
                              src='https://i.imgur.com/lMi72st.png'
                              position='top'
                              alt='...'/>

                              <MDBCardBody>
                                  <MDBCardTitle
                                  style={{ color: 'white' }}>
                                      Attendance
                                  </MDBCardTitle>
                                  <MDBCardText
                                  style={{ color: 'white' }}>
                                      See the percentage of students who reported attendance as mandatory for each professor
                                  </MDBCardText>
                              
                              </MDBCardBody>
                          </MDBCard>
                      </MDBCol>

                      <MDBCol
                      md="2"
                      style={sectionStyle}>

                          <MDBCard
                          className='h-100'
                          style={{backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)'}}>

                              <MDBCardImage
                              src='https://i.imgur.com/ju9c2zL.png'
                              position='top'
                              alt='...' />

                                  <MDBCardBody>

                                      <MDBCardTitle
                                      style={{ color: 'white' }}>
                                          Top tags
                                      </MDBCardTitle>

                                      <MDBCardText
                                      style={{ color: 'white' }}>
                                          See the most common tags given by students for each professor
                                      </MDBCardText>

                                  </MDBCardBody>
                          </MDBCard>
                      </MDBCol>
                      </MDBRow>
              </MDBCardBody>
          </MDBCol>




        

        </MDBContainer>
    </>
    );
};
 
export default Home;

