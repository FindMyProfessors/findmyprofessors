import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
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

const HeaderDashboard = ({ onSearch }) => {

  const [openNavCentred, setOpenNavCentred] = useState(false);
  const headerRef = useRef();

  const [filters, setFilters] = useState({
    schoolId: null,
    year: null,
    semester: null,
    query: ''
  });

  const { schoolId, year, semester, query } = filters;

  const handleDropdownClick = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
    });
  }, []);

  const preventClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const getSchoolText = () => {
    switch (schoolId) {
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
    switch (year) {
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
    switch (semester) {
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
                <MDBIcon icon="search fa-1x me-3" style={{ color: '#000000' }} />
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
                <MDBDropdown onClick={preventClose}>
                  <MDBDropdownToggle color="dark">{getSchoolText()}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('schoolId', 1)}>
                      UCF {schoolId === 1 && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('schoolId', 2)}>
                      Valencia {schoolId === 2 && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('schoolId', 3)}>
                      Other {schoolId === 3 && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                <MDBDropdown onClick={preventClose}>
                  <MDBDropdownToggle color="dark">{getYearText()}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('year', 2023)}>
                      2023 {year === 2023 && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('year', 2024)}>
                      2024 {year === 2024 && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('year', 2025)}>
                      2025 {year === 2025 && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                <MDBDropdown onClick={preventClose}>
                  <MDBDropdownToggle color="dark">{getSemesterText()}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('semester', 'Fall')}>
                      Fall {semester === 'Fall' && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('semester', 'Spring')}>
                      Spring {semester === 'Spring' && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('semester', 'Summer')}>
                      Summer {semester === 'Summer' && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                <form className="d-flex input-group w-auto">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search Courses"
                    value={query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                  />
                  <MDBBtn color="dark" onClick={onSearch}>
                    <MDBIcon icon="search" />
                  </MDBBtn>
                </form>

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
}
export default HeaderDashboard;
