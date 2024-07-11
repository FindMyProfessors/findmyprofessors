import React from 'react';
import { Link } from "react-router-dom";
import Header from './Header';


const Dashboard = () => {
  
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
        <h1 style={headingStyle}>Dashboard</h1>
        <section className="pt-0 pb-5" style={sectionStyle}>
        <div className="center" style={centerStyle}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <h2 style={headingStyle}>Some awesome stuff will be in here when we merge our branches :D</h2>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    );
}

export default Dashboard;



    