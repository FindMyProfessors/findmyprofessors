import React, { useState } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import DashboardHeader from './DashboardHeader';
import Header from './Header';
import ProfessorTable from './ProfessorTable';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const [showTable, setShowTable] = useState(false);
  const [filters, setFilters] = useState({
    schoolId: null,
    year: null,
    semester: null,
    query: ''
  });

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

  const handleSearchClick = () => {
    setShowTable(true);
  };

  const preventClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const getSchoolText = () => {
    switch (filters.schoolId) {
      case 1:
        return 'UCF';
      case 2:
        return 'Valencia';
      case 3:
        return 'Other';
      default:
        return 'Select School';
    }
  };

  const getYearText = () => {
    switch (filters.year) {
      case 2023:
        return '2023';
      case 2024:
        return '2024';
      case 2025:
        return '2025';
      default:
        return 'Select Year';
    }
  };

  const getSemesterText = () => {
    switch (filters.semester) {
      case 'Fall':
        return 'Fall';
      case 'Spring':
        return 'Spring';
      case 'Summer':
        return 'Summer';
      default:
        return 'Select Semester';
    }
  };

  return (
    <>
      {!showTable ? (
        <>
          <Header />

          <style>{'body { background-color: #121212; }'}</style>
          <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <h1 className="display-4 fw-bold" style={{ color: 'white' }}>FIND MY PROFESSORS</h1>
              <h2 style={{ color: 'white' }}>A better way to search for professors</h2>
              <SearchBar
                onSearch={handleSearchClick}
                filters={filters}
                setFilters={setFilters}
                preventClose={preventClose}
                getSchoolText={getSchoolText}
                getYearText={getYearText}
                getSemesterText={getSemesterText}
              />
            </div>
          </MDBContainer>
        </>
      ) : (
        <>
          <DashboardHeader onSearch={handleSearchClick} />
          <div className="my-4">
            <ProfessorTable professors={professorsData} />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
