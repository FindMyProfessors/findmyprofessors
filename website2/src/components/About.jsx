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

const About = () => {

    const sectionStyle = {
        paddingTop: '20px',
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
        marginTop: '50px'
    }

    return (
    <>
        <Header />

        <div style={textStyle}>
            <h1>About Find my Professor</h1>
        </div>


        <MDBContainer style={containerStyle}>
            <MDBCard style={{ width: '100%', margin: '0 auto' }}>
                <MDBRow className='g-0'>


                    <MDBCol md='6'>
                        <MDBCard style={{ width: '90%', margin: '0 auto', marginTop: '30px' }}>
                            <MDBCardHeader>Featured</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Special title treatment</MDBCardTitle>
                                <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
                                <MDBBtn href='#'>Go somewhere</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>
                            <MDBRow className ="mb-0">

                                <MDBCol md="4" offsetMd="0">
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/city/041.webp' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Average Rating</MDBCardTitle>
                                                    <MDBCardText>
                                                        Average Rating
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4">
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/city/042.webp' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Average Grade</MDBCardTitle>
                                                    <MDBCardText>
                                                        Average Grade
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4">
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/city/043.webp' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Difficulty</MDBCardTitle>
                                                    <MDBCardText>
                                                        Average Difficulty
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>


                            <MDBRow className ="mb-0">

                                <MDBCol md="4" style={sectionStyle}>
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/city/044.webp' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Would take again</MDBCardTitle>
                                                    <MDBCardText>
                                                        Percent of students who would take this professor again
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4" style={sectionStyle}>
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/city/041.webp' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Attendance</MDBCardTitle>
                                                    <MDBCardText>
                                                        Percent chance of mandatory attendance
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4" style={sectionStyle}>
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/city/042.webp' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Top tags</MDBCardTitle>
                                                    <MDBCardText>
                                                        Most common tags
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>
                        </MDBCardBody>

                    </MDBCol>
                    
                </MDBRow>
            </MDBCard>
        </MDBContainer>

    </>
    );
};
 
export default About;

