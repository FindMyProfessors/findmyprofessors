import React from "react";
import { Link } from "react-router-dom";

import {
    CButton,
    CContainer,
    CCard,
    CCardBody,
    CCardImage,
    CRow,
    CCol,
    CCardTitle,
    CCardText,
    CCardHeader
} from '@coreui/react';

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


        <div style={textStyle}>
            <h1>About Find my Professor</h1>
        </div>

        <CContainer style={containerStyle}>
            <CCard style={{ width: '100%', margin: '0 auto' }}>
                <CRow className='g-0'>
                    <CCol md='6'>
                        <CCard style={{ width: '90%', margin: '0 auto', marginTop: '30px' }}>
                            <CCardHeader>Featured</CCardHeader>
                            <CCardBody>
                                <CCardTitle>Special title treatment</CCardTitle>
                                <CCardText>With supporting text below as a natural lead-in to additional content.</CCardText>
                                <CButton href='#'>Go somewhere</CButton>
                            </CCardBody>
                        </CCard>
                    </CCol>

                    <CCol md='6'>
                        <CCardBody className='d-flex flex-column'>
                            <CRow className="mb-0">
                                <CCol md="4" offsetMd="0">
                                    <CCard className='h-100'>
                                        <CCardImage src='https://mdbootstrap.com/img/new/standard/city/041.webp' position='top' alt='...' />
                                        <CCardBody>
                                            <CCardTitle>Average Rating</CCardTitle>
                                            <CCardText>
                                                Average Rating
                                            </CCardText>
                                        </CCardBody>
                                    </CCard>
                                </CCol>

                                <CCol md="4">
                                    <CCard className='h-100'>
                                        <CCardImage src='https://mdbootstrap.com/img/new/standard/city/042.webp' position='top' alt='...' />
                                        <CCardBody>
                                            <CCardTitle>Average Grade</CCardTitle>
                                            <CCardText>
                                                Average Grade
                                            </CCardText>
                                        </CCardBody>
                                    </CCard>
                                </CCol>

                                <CCol md="4">
                                    <CCard className='h-100'>
                                        <CCardImage src='https://mdbootstrap.com/img/new/standard/city/043.webp' position='top' alt='...' />
                                        <CCardBody>
                                            <CCardTitle>Difficulty</CCardTitle>
                                            <CCardText>
                                                Average Difficulty
                                            </CCardText>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                            <CRow className="mb-0">
                                <CCol md="4" style={sectionStyle}>
                                    <CCard className='h-100'>
                                        <CCardImage src='https://mdbootstrap.com/img/new/standard/city/044.webp' position='top' alt='...' />
                                        <CCardBody>
                                            <CCardTitle>Would take again</CCardTitle>
                                            <CCardText>
                                                Percent of students who would take this professor again
                                            </CCardText>
                                        </CCardBody>
                                    </CCard>
                                </CCol>

                                <CCol md="4" style={sectionStyle}>
                                    <CCard className='h-100'>
                                        <CCardImage src='https://mdbootstrap.com/img/new/standard/city/041.webp' position='top' alt='...' />
                                        <CCardBody>
                                            <CCardTitle>Attendance</CCardTitle>
                                            <CCardText>
                                                Percent chance of mandatory attendance
                                            </CCardText>
                                        </CCardBody>
                                    </CCard>
                                </CCol>

                                <CCol md="4" style={sectionStyle}>
                                    <CCard className='h-100'>
                                        <CCardImage src='https://mdbootstrap.com/img/new/standard/city/042.webp' position='top' alt='...' />
                                        <CCardBody>
                                            <CCardTitle>Top tags</CCardTitle>
                                            <CCardText>
                                                Most common tags
                                            </CCardText>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CCard>
        </CContainer>
    </>
    );
};

export default About;
