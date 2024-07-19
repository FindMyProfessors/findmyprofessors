import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
  CLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilCart } from '@coreui/icons';

// Sample data for professors
const professors = [
  {
    name: 'Anoop Guha',
    grade: 'B+',
    avgQuality: 3.72,
    avgDifficulty: 3.81,
    recentQuality: 3.99,
    recentDifficulty: 3.58,
    ratingsCount: 309,
  },
  {
    name: 'Matthew Gerber',
    grade: 'A',
    avgQuality: 4.74,
    avgDifficulty: 3.06,
    recentQuality: 4.58,
    recentDifficulty: 3.30,
    ratingsCount: 140,
  },
];

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (professor) => {
    navigate(`/prof/${professor.name}`, { state: { professor } });
  };

  const handleDeleteFromCart = (professor) => {
    // need logic here*****
    alert(`${professor.name} has been deleted from your cart.`);
  };
  

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <div className="flex-grow-1 d-flex justify-content-center mb-4">
            <CInputGroup style={{ maxWidth: '50vh' }}>
              <CFormInput type="search" placeholder="Search by all columns" />
              <CInputGroupText>
                <CButton type="button" color="primary">
                  <CIcon icon={cilSearch} />
                </CButton>
              </CInputGroupText>
            </CInputGroup>
          </div>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary">Full Name</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Average Grade</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Average Quality</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Average Difficulty</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Recent Quality Average</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Recent Difficulty Average</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Ratings Count</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {professors.map((professor, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <CLink onClick={() => handleRowClick(professor)}>
                      {professor.name}
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell>{professor.grade}</CTableDataCell>
                  <CTableDataCell>{professor.avgQuality}</CTableDataCell>
                  <CTableDataCell>{professor.avgDifficulty}</CTableDataCell>
                  <CTableDataCell>{professor.recentQuality}</CTableDataCell>
                  <CTableDataCell>{professor.recentDifficulty}</CTableDataCell>
                  <CTableDataCell>{professor.ratingsCount}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="danger" onClick={() => handleDeleteFromCart(professor)}>
                      <CIcon icon={cilCart} /> Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
              <CTableRow>
            <CTableHeaderCell scope="row" color="light">Total Average</CTableHeaderCell>
                <CTableDataCell color="light">Cell</CTableDataCell>
                <CTableDataCell color="light">Cell</CTableDataCell>
                <CTableDataCell color="light">Cell</CTableDataCell>
                <CTableDataCell color="light">Cell</CTableDataCell>
                <CTableDataCell color="light">Cell</CTableDataCell>
                <CTableDataCell color="light">Cell</CTableDataCell>
                <CTableDataCell color="light"></CTableDataCell>
            </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Cart;
