import React from 'react';
import { Link } from "react-router-dom";
import HeaderDashboard from './HeaderDashboard';
import ProfessorTable from './ProfessorTable';


const Dashboard = () => {
  
    <HeaderDashboard />

    const professorsData = [
        {
          fullName: 'Arup Guha',
          averageGrade: 'B+',
          averageQuality: 3.72,
          averageDifficulty: 3.81,
          recentQualityAverage: 3.99,
          recentDifficultyAverage: 3.58,
          ratingsCount: 309,
          course: 'UCF'
        },
        {
          fullName: 'Matthew Gerber',
          averageGrade: 'A',
          averageQuality: 4.74,
          averageDifficulty: 3.06,
          recentQualityAverage: 4.58,
          recentDifficultyAverage: 3.10,
          ratingsCount: 140,
          course: 'UCF'
        },
        // Add more professors as needed
      ];
    
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
        <HeaderDashboard />
        <div>
            <ProfessorTable professors={professorsData} />
        </div>
        <h1 style={headingStyle}>Dashboard</h1>
        <section className="pt-0 pb-5" style={sectionStyle}>
        <div className="center" style={centerStyle}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <h2 style={headingStyle}>No classes have been added. Use the search bar to search for courses.</h2>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    );
}

export default Dashboard;