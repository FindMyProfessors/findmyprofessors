import React from 'react';
import { Link } from "react-router-dom";


import {
    CCarousel,
    CCarouselItem,
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardImage,
    CCardTitle,
    CCardText
} from '@coreui/react';

const ContactUs = () => {

    const sectionStyle = {
        paddingTop: '0px',
        paddingBottom: '0',
        marginTop: '-220px'
    };
    const centerStyle = {
        textAlign: 'center'
    };
    const headingStyle = {
        marginTop: '50px',
        textAlign: 'center'
    };

    const customCarouselStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    };

    const customCardStyle = {
        paddingLeft: '7.5px',
        paddingRight: '7.5px',
        flex: '0 0 20%',
        maxWidth: '20%',
        margin: 'auto'
    };

    const renderCards = () => {
        const cardData = [
            {
                imgSrc: 'https://avatars.githubusercontent.com/u/42919066?v=4',
                title: 'Warren Snipez',
                text: 'Database and API',
                link: 'https://github.com/LockedThread'
            },
            {
                imgSrc: 'https://avatars.githubusercontent.com/u/61954066?v=4',
                title: 'Zachary Cary',
                text: 'Front End Web App',
                link: 'https://github.com/zachcary1'
            },
            {
                imgSrc: 'https://avatars.githubusercontent.com/u/100425382?v=4',
                title: 'Hanna Pitino',
                text: 'Front End Web App',
                link: 'https://github.com/hpitino11'
            },
            {
                imgSrc: 'https://avatars.githubusercontent.com/u/125507795?v=4',
                title: 'Jandro Damas Sosa',
                text: 'Front End Mobile App',
                link: 'https://github.com/Jandro-WDS'
            },
            {
                imgSrc: 'https://avatars.githubusercontent.com/u/109311637?v=4',
                title: 'Diego Vento Camacho',
                text: 'Front End Mobile App',
                link: 'https://github.com/Doog4321'
            },
        ];

        return cardData.map((card, index) => (
            <CCol key={index} style={customCardStyle}>
                <CCard>
                    <a href={card.link} target="_blank" rel="noopener noreferrer">
                        <CCardImage orientation="top" src={card.imgSrc} />
                    </a>
                    <CCardBody>
                        <CCardTitle>{card.title}</CCardTitle>
                        <CCardText>{card.text}</CCardText>
                    </CCardBody>
                </CCard>
            </CCol>
        ));
    };

    return (
        <>
            <h1 style={headingStyle}>Contact Us</h1>
            <section className="pt-0 pb-5" style={sectionStyle}>
                <div className="center" style={centerStyle}>
                    <CContainer fluid>
                        <CRow>
                            <CCol xs="10" className="mx-auto">
                                <CCarousel>
                                    <CCarouselItem className="active">
                                        <CRow style={customCarouselStyle}>
                                            {renderCards()}
                                        </CRow>
                                    </CCarouselItem>
                                </CCarousel>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
            </section>
        </>
    );
}

export default ContactUs;
