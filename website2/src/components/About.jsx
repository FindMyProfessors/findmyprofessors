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
    MDBCardHeader,
    MDBBadge,
    MDBListGroup,
    MDBListGroupItem,
  } from 'mdb-react-ui-kit';

const About = () => {

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



        <MDBContainer style={containerStyle}>
            <MDBCard style={{ width: '100%', margin: '0 auto' }}>
                <MDBRow className='g-0'>

                    <MDBCol md='6'>
                        <MDBCard style={{ width: '90%', margin: '0 auto', marginTop: '20px', marginBottom: '20px'}}>
                            <MDBCardHeader style={{ fontSize: '2rem' }}><b>Find my Professors</b></MDBCardHeader>
                            <MDBCardBody style={{ padding: '15px' }}>
                                
                                <MDBCardTitle>Why choose Find my Professors?</MDBCardTitle>
                                <MDBCardText>
                                    Instead of searching each professor one by one, simply enter your class code to access a full list of professors offering your course. 
                                    Make informed decisions effortlessly and ensure a better learning experience with Find My Professors.</MDBCardText>

                                    <MDBListGroup light numbered style={{ minWidth: '22rem' }}>

                                        <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                                            <div className='ms-2 me-auto'>
                                                <div className='fw-bold'>Overall quality</div>
                                                See the overall quality rating students gave each professor, and be able to sort by time periods
                                            </div>
                                        </MDBListGroupItem>

                                        <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                                            <div className='ms-2 me-auto'>
                                                <div className='fw-bold'>Average grade</div>
                                                See the average grade received by students who took each professor
                                            </div>
                                        </MDBListGroupItem>

                                        <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                                            <div className='ms-2 me-auto'>
                                                <div className='fw-bold'>Average difficulty</div>
                                                See the average difficulty rating students gave each professor
                                            </div>
                                        </MDBListGroupItem>

                                        <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                                            <div className='ms-2 me-auto'>
                                                <div className='fw-bold'>Would take again %</div>
                                                See the percentage of students who would be willing to take another class by each professor
                                            </div>
                                        </MDBListGroupItem>

                                        <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                                            <div className='ms-2 me-auto'>
                                                <div className='fw-bold'>Mandatory attendance %</div>
                                                See the percentage of students who rated each professor as having mandatory attendance
                                            </div>
                                        </MDBListGroupItem>

                                        <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                                            <div className='ms-2 me-auto'>
                                                <div className='fw-bold'>Top tags</div>
                                                See the top tags students gave each professor
                                            </div>
                                        </MDBListGroupItem>

                                    </MDBListGroup>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>
                            <MDBRow className ="mb-0">

                                <MDBCol md="4" offsetMd="0">
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://i.imgur.com/j4QoUgR.png' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Overall Quality</MDBCardTitle>
                                                    <MDBCardText>
                                                        Average Rating students gave this professor
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4">
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://i.imgur.com/YYboB11.png' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Average Grade</MDBCardTitle>
                                                    <MDBCardText>
                                                        Average Grade students received by this professor
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4">
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://i.imgur.com/2sNQteW.png' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Difficulty</MDBCardTitle>
                                                    <MDBCardText>
                                                        Average Difficulty students rated this professor
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>


                            <MDBRow className ="mb-0">

                                <MDBCol md="4" style={sectionStyle}>
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://i.imgur.com/TOYrhFO.png' position='top' alt='...' />
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
                                        <MDBCardImage src='https://i.imgur.com/lMi72st.png' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Attendance</MDBCardTitle>
                                                    <MDBCardText>
                                                        Percentage of students who reported attendance as mandatory
                                                    </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="4" style={sectionStyle}>
                                    <MDBCard className='h-100'>
                                        <MDBCardImage src='https://i.imgur.com/ju9c2zL.png' position='top' alt='...' />
                                            <MDBCardBody>
                                                <MDBCardTitle>Top tags</MDBCardTitle>
                                                    <MDBCardText>
                                                        Most common tags given by students
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
