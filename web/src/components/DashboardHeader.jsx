import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

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
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBInputGroup

} from 'mdb-react-ui-kit';


const DashboardHeader = ({ onSearch }) => {

  const [openNavCentred, setOpenNavCentred] = useState(false);
  const headerRef = useRef();

  const [filters, setFilters] = useState({
    schoolId: null,
    year: null,
    semester: null,
    query: ''
  });

  const handleSearchClick = () => {
    onSearch();
  };

  const preventClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
      case 'FALL':
        return 'FALL';
      case 'SPRING':
        return 'SPRING';
      case 'SUMMER':
        return 'SUMMER';
      default:
        return 'Select Semester';
    }
  };

  return (
    <>
    {/* Header/Navbar */}
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>

        <MDBNavbarToggler
          type='button'
          data-target='#navbarCenteredExample'
          aria-controls='navbarCenteredExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavCentred(!openNavCentred)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        {/* Left Side */}
        <div className="d-flex justify-content-start w-100">

          <MDBNavbarBrand href='/'>
              <MDBIcon icon="search fa-1x me-3" style={{ color: '#3d3d3d' }} />
              Find My Professors
          </MDBNavbarBrand>

          <MDBCollapse navbar>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink href='/'>Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='./About'>About</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='./ContactUs'>Contact</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </div>

        {/* Center */}
        <div className="d-flex justify-content-center w-100">
          <MDBCollapse navbar open={openNavCentred} center id='navbarCenteredExample'>
            <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0 d-flex align-items-center' style={{ width: 'fit-content' }}>
              
            <SearchBar
                onSearch={handleSearchClick}
                filters={filters}
                setFilters={setFilters}
                preventClose={preventClose}
                getYearText={getYearText}
                getSemesterText={getSemesterText}
              />

            </MDBNavbarNav>
          </MDBCollapse>
        </div>

        {/* Right Side */}
        <div className="d-flex justify-content-end">
          <MDBCollapse navbar>
            <MDBNavbarNav>

              <MDBNavbarItem>
                <MDBNavbarLink href='/'>Cart</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href='./About'>Profile</MDBNavbarLink>
              </MDBNavbarItem>

            </MDBNavbarNav>
          </MDBCollapse>
        </div>

      </MDBContainer>
    </MDBNavbar>
  </>
);
};

export default DashboardHeader;
