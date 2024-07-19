import React from 'react';
import { Link } from "react-router-dom";
import Header from './Header';


const ContactUs = () => {
  
    <Header />
    
    const imageStyle = {marginTop: '-55px'};
    const captionStyle = {marginBottom: '140px'};
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
        textAlign:'center'
    };

    return (
        <>
        <Header />
        <h1 style={headingStyle}>Contact Us</h1>
        <section className="pt-0 pb-5" style={sectionStyle}>
        <div className="center" style={centerStyle}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="row" style={customCarouselStyle}>
                                      {renderCards()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    );
}

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
    <div key={index} className="col" style={customCardStyle}>
        <div className="card">
        <a href={card.link} target="_blank" rel="noopener noreferrer">
        <img className="img-fluid" alt="100%x280" src={card.imgSrc} />
        </a>
        <div className="card-body">
            <h4 className="card-title">{card.title}</h4>
            <p className="card-text">{card.text}</p>
        </div>
        </div>
    </div>
    ));
};
    
const customCarouselStyle = {
    marginLeft: '-15px',
    marginRight: '-15px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
};

const customCardStyle = {
    paddingLeft: '7.5px',
    paddingRight: '7.5px',
    flex: '0 0 20%',
    maxWidth: '20%',
    margin: 'auto'
};
export default ContactUs;



    