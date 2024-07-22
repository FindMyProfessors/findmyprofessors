import React, { useState } from 'react';
import { MDBInputGroup, MDBBtn, MDBIcon, MDBInput, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';

const SearchBar = ({ onSearch, filters, setFilters, preventClose, getYearText, getSemesterText }) => {
  const { year, semester, query, schoolId } = filters;

  const handleDropdownClick = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const handleSchoolClick = async () => {
    const token = localStorage.getItem('token');
    console.log('token is: ' + token);

    if (token) {
      try {
        const response = await fetch('http://localhost:8080/schools/search?name=University of Central Florida', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Data received:', data); // Log the received data

          const ucfEdge = data.edges.find(edge => edge.node && edge.node.name === 'University of Central Florida');

          if (ucfEdge && ucfEdge.node && ucfEdge.node.id) {
            const ucfSchoolId = ucfEdge.node.id;
            setFilters((prevFilters) => ({
              ...prevFilters,
              schoolId: ucfSchoolId,
            }));
          } else {
            console.error('University of Central Florida not found in the response data');
          }
        } else {
          console.error('Failed to fetch school data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    } else {
      console.error('No token found');
    }
  };

  const fetchCourses = async (schoolId, year, semester) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/courses/search?school_id=${schoolId}&year=${year}&semester=${semester}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Courses data received:', data); // Log the received courses data
          // Handle the response and extract the ID
          console.log('Course id')
        } else {
          console.error('Failed to fetch courses data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    } else {
      console.error('No token found');
    }
  };

  const handleSearchClick = () => {
    if (schoolId) {
      fetchCourses(schoolId, year, semester, query);
    } else {
      console.error('No school selected');
    }
  };

  return (
    <div
    className="text-center my-5">

      <MDBInputGroup
      className="w-auto">

        <MDBDropdown
        onClick={preventClose}>

          <MDBDropdownToggle
          link color="primary">{schoolId ? "University of Central Florida" : "Select School"}
          </MDBDropdownToggle>

          <MDBDropdownMenu>

            <MDBDropdownItem
            link
            onClick={handleSchoolClick}>
              University of Central Florida {schoolId && <MDBIcon icon="check" />}
            </MDBDropdownItem>

          </MDBDropdownMenu>
        </MDBDropdown>

        <MDBDropdown
        onClick={preventClose}>

          <MDBDropdownToggle
          color="primary">{getYearText()}
          </MDBDropdownToggle>

          <MDBDropdownMenu>
            <MDBDropdownItem
            link
            onClick={() => handleDropdownClick('year', 2023)}>
              2023 {year === 2023 && <MDBIcon icon="check" />}
            </MDBDropdownItem>

            <MDBDropdownItem
            link
            onClick={() => handleDropdownClick('year', 2024)}>
              2024 {year === 2024 && <MDBIcon icon="check" />}
            </MDBDropdownItem>

            <MDBDropdownItem
            link
            onClick={() => handleDropdownClick('year', 2025)}>
              2025 {year === 2025 && <MDBIcon icon="check" />}
            </MDBDropdownItem>

          </MDBDropdownMenu>
        </MDBDropdown>

        <MDBDropdown
        onClick={preventClose}>
          <MDBDropdownToggle
          color="primary">{getSemesterText()}</MDBDropdownToggle>
          <MDBDropdownMenu>

            <MDBDropdownItem
            link
            onClick={() => handleDropdownClick('semester', 'FALL')}>
              Fall {semester === 'FALL' && <MDBIcon icon="check" />}
            </MDBDropdownItem>

            <MDBDropdownItem
            link
            onClick={() => handleDropdownClick('semester', 'Spring')}>
              Spring {semester === 'Spring' && <MDBIcon icon="check" />}
            </MDBDropdownItem>

            <MDBDropdownItem
            link
            onClick={() => handleDropdownClick('semester', 'Summer')}>
              Summer {semester === 'Summer' && <MDBIcon icon="check" />}
            </MDBDropdownItem>

          </MDBDropdownMenu>
        </MDBDropdown>

        <MDBInput
        label="Search Courses"
        style={{ backgroundColor: '#3f3f3f', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
        labelClass="text-white"
        contrast
        value={query}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}/>

        <MDBBtn
        color="primary"
        onClick={handleSearchClick}>

          <MDBIcon
          icon="search"/>
        </MDBBtn>

      </MDBInputGroup>
    </div>
  );
};

export default SearchBar;
