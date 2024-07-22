import React, { useState, useEffect } from 'react';
import { MDBInputGroup, MDBBtn, MDBIcon, MDBInput, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import debounce from 'lodash.debounce';

const SearchBar = ({ onSearch, filters, setFilters, preventClose, getYearText, getSemesterText }) => {
  const { year, semester, query, schoolId } = filters;
  const [searchResults, setSearchResults] = useState([]);

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

  const fetchProfessors = async (courseId, year, semester) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/courses/${courseId}/professors?year=${year}&semester=${semester}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Professors data received:', data); // Log the received professors data
          // Handle the response as needed
        } else {
          console.error('Failed to fetch professors data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching professors data:', error);
      }
    } else {
      console.error('No token found');
    }
  };

  const fetchCourses = async (schoolId, year, semester, query) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch(`http://localhost:8080/courses/search?school_id=${schoolId}&year=${year}&semester=${semester}&query=${query}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Courses data received:', data); // Log the received courses data

          if (data.edges && data.edges.length > 0) {
            const courseId = data.edges[0].node.id;
            console.log('Course ID:', courseId);
            fetchProfessors(courseId, year, semester); // Fetch professors after getting the course ID
          } else {
            console.error('No courses found');
          }
          setSearchResults(data.edges.map(edge => edge.node));
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

  const debouncedFetchCourses = debounce((query) => {
    if (schoolId) {
      fetchCourses(schoolId, year, semester, query);
    }
  }, 300);

  useEffect(() => {
    if (query) {
      debouncedFetchCourses(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSearchClick = () => {
    if (schoolId) {
      fetchCourses(schoolId, year, semester, query);
    } else {
      console.error('No school selected');
    }
  };

  return (
    <div className="text-center my-5">
      <div className="search-container position-relative d-inline-block">
        <MDBInputGroup className="w-auto">
          <MDBDropdown onClick={preventClose}>
            <MDBDropdownToggle color="primary">{schoolId ? "University of Central Florida" : "Select School"}</MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem onClick={handleSchoolClick}>
                University of Central Florida {schoolId && <MDBIcon icon="check" />}
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
              <MDBDropdownItem onClick={() => handleDropdownClick('semester', 'FALL')}>
                Fall {semester === 'FALL' && <MDBIcon icon="check" />}
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => handleDropdownClick('semester', 'Spring')}>
                Spring {semester === 'Spring' && <MDBIcon icon="check" />}
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => handleDropdownClick('semester', 'Summer')}>
                Summer {semester === 'Summer' && <MDBIcon icon="check" />}
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>

          <MDBInput label="Search Courses" value={query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
          <MDBBtn color="primary" onClick={handleSearchClick}>
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>

        {searchResults.length > 0 && (
          <div className="dropdown-menu show w-100 position-absolute">
            {searchResults.map(course => (
              <div key={course.id} className="dropdown-item">
                {course.code}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
