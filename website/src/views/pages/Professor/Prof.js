import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { Radar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, Title);

const Prof = () => {
  const location = useLocation();
  const { professor } = location.state || {};

  if (!professor) {
    return <div>No professor data available</div>;
  }

  const radarData = {
    labels: [
      'Clear Grading Criteria',
      'Tests are Tough',
      'Participation Matters',
      'So Many Papers',
      'Graded by Few Things',
      'Inspirational',
      'Extra Credit',
      'Would Take Again',
    ],
    datasets: [
      {
        label: 'Criteria Ratings',
        data: [3, 4, 2, 4, 3, 5, 4, 3], // Example data
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan 21', 'Jun 18', 'Feb 16', 'Jan 13', 'Mar 09', 'May 05', 'Aug 03'],
    datasets: [
      {
        label: 'Rating Over Time',
        data: [2.5, 3, 3.5, 4, 4.5, 4, 4.5], // Example data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Professor Information</h4>
          </CCardHeader>
          <CCardBody>
            <h5>Name: {professor.name}</h5>
            <p>Department: Computer Science</p>
            <p>University: UCF</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Difficulty</h4>
          </CCardHeader>
          <CCardBody>
            <p>Average Difficulty: {professor.avgDifficulty}</p>
            <p>Recent Difficulty: {professor.recentDifficulty}</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Grades</h4>
          </CCardHeader>
          <CCardBody>
            <p>Average Grade: {professor.grade}</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Quality</h4>
          </CCardHeader>
          <CCardBody>
            <p>Average Quality: {professor.avgQuality}</p>
            <p>Recent Quality: {professor.recentQuality}</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Ratings Count</h4>
          </CCardHeader>
          <CCardBody>
            <p>{professor.ratingsCount} Ratings</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Criteria Ratings</h4>
          </CCardHeader>
          <CCardBody>
            <Radar data={radarData} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Rating Over Time</h4>
          </CCardHeader>
          <CCardBody>
            <Line data={lineData} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Prof;
