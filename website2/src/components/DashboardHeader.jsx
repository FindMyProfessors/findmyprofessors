import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavbarLink,
  MDBInputGroup,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';

const DashboardHeader = ({ onSearch }) => {
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


    
    <MDBNavbar sticky="top" className="mb-4 p-0" ref={headerRef}>
      <MDBContainer className="border-bottom px-4" fluid>

          <MDBIcon icon="bars" size="lg" />

        <MDBNavbarNav className="d-none d-md-flex">
          <MDBNavbarLink tag={NavLink} to="/dashboard">
            Dashboard
          </MDBNavbarLink>
        </MDBNavbarNav>

        <div className="flex-grow-1 d-flex justify-content-center">
          <MDBInputGroup className="w-auto">

            <MDBDropdown onClick={preventClose}>
              <MDBDropdownToggle color="primary">{getSchoolText()}</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => handleDropdownClick('schoolId', 1)}>
                  UCF {schoolId === 1 && <MDBIcon icon="check" />}
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleDropdownClick('schoolId', 2)}>
                  Valencia {schoolId === 2 && <MDBIcon icon="check" />}
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleDropdownClick('schoolId', 3)}>
                  Other {schoolId === 3 && <MDBIcon icon="check" />}
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>

            <MDBDropdown onClick={preventClose}>
              <MDBDropdownToggle color="primary">{getYearText()}</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => handleDropdownClick('year', 2023)}>
                  2023 {year === 2023 && <MDBIcon icon="check" />}
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleDropdownClick('year', 2024)}>
                  2024 {year === 2024 && <MDBIcon icon="check" />}
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleDropdownClick('year', 2025)}>
                  2025 {year === 2025 && <MDBIcon icon="check" />}
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>

            <MDBDropdown onClick={preventClose}>
              <MDBDropdownToggle color="primary">{getSemesterText()}</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => handleDropdownClick('semester', 'Fall')}>
                  Fall {semester === 'Fall' && <MDBIcon icon="check" />}
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleDropdownClick('semester', 'Spring')}>
                  Spring {semester === 'Spring' && <MDBIcon icon="check" />}
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleDropdownClick('semester', 'Summer')}>
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
              <MDBBtn color="primary" onClick={onSearch}>
                <MDBIcon icon="search" />
              </MDBBtn>
            </form>
          </MDBInputGroup>
        </div>

        <MDBNavbarNav className="ms-auto">
          <MDBNavbarLink href="#">
            <MDBIcon icon="shopping-cart" size="lg" />
          </MDBNavbarLink>
        </MDBNavbarNav>
        
      </MDBContainer>
    </MDBNavbar>
  );
};

export default DashboardHeader;
