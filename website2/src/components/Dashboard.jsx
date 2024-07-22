import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBInputGroup, MDBBtn, MDBIcon, MDBInput, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import Header from './Header';
import debounce from 'lodash.debounce';
import { Line, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    year: null,
    semester: null,
    query: '',
    schoolId: null,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [professorsData, setProfessorsData] = useState([]);

  const preventClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const getYearText = () => {
    switch (filters.year) {
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
          console.log('Data received:', data);

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
          console.log('Professors data received:', data);

          if (data.professors) {
            setProfessorsData(data.professors);
          } else {
            console.error('No professors found in the response data');
          }
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
          console.log('Courses data received:', data);

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
    <>
      <Header />

      <style>{'body { background-color: #121212; }'}</style>

      <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">

        <div className="text-center">

          <h1 className="display-4 fw-bold" style={{ color: 'white' }}>
            FIND MY PROFESSORS
          </h1>

          <h2 style={{ color: 'white' }}>
            A better way to search for professors
          </h2>

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

          {professorsData.length > 0 && (
            <div className="my-4">
              <ProfessorTable professors={professorsData} />
            </div>
          )}

        </div>
      </MDBContainer>
    </>
  );
};

const ProfessorTable = ({ professors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsPerPage = 10;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProfessors = professors.filter(professor =>
    (professor.first_name + ' ' + professor.last_name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfessors = filteredProfessors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProfessors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (professor) => {
    if (selectedProfessor === professor) {
      setIsExpanded(!isExpanded);
    } else {
      setSelectedProfessor(professor);
      setIsExpanded(true);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol size="4">
          <MDBInput label="Search by all columns" value={searchTerm} onChange={handleSearch} />
        </MDBCol>
      </MDBRow>
      <MDBTable responsive>
        <MDBTableHead dark>
          <tr>
            <th></th>
            <th>Full Name</th>
            <th>Average Grade</th>
            <th>Average Quality</th>
            <th>Average Difficulty</th>
            <th>Recent Quality Average</th>
            <th>Recent Difficulty Average</th>
            <th>Ratings Count</th>
            <th>Add</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentProfessors.map((professor, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(professor)}>
                <td>
                  <MDBIcon icon={isExpanded && selectedProfessor === professor ? 'angle-up' : 'angle-down'} />
                </td>
                <td>{professor.first_name + ' ' + professor.last_name}</td>

                <td>
                  <MDBBtn style={{ backgroundColor: 'rgb(0, 102, 0)', color: 'white' }} size="sm">Add</MDBBtn>
                </td>
              </tr>
              {selectedProfessor === professor && isExpanded && (
                <tr>
                  <td colSpan="9">
                    <ProfessorDetails professor={professor} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </MDBTableBody>
      </MDBTable>
      <MDBPagination className="my-4">
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink onClick={() => paginate(currentPage - 1)}>
            &laquo;
          </MDBPaginationLink>
        </MDBPaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <MDBPaginationItem active={currentPage === index + 1} key={index}>
            <MDBPaginationLink onClick={() => paginate(index + 1)}>
              {index + 1}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink onClick={() => paginate(currentPage + 1)}>
            &raquo;
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </MDBContainer>
  );
};

const ProfessorDetails = ({ professor }) => {
  const lineData = {
    labels: ['21 Jan', '18 Jun', '16 Feb', '13 Jan', '09 Mar', '10 May', '03 Aug'],
    datasets: [
      {
        label: 'Rating Over Time',
        data: [3, 3.5, 4, 4.5, 4, 4.2, 4.5],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const radarData = {
    labels: ['Clear Grading Criteria', 'Tests Are Tough', 'So Many Papers', 'Graded by Few Things', 'Inspirational', 'Extra Credit', 'Participation Matters', 'Would Take Again'],
    datasets: [
      {
        label: 'Professor Feedback',
        data: [4, 3, 2, 5, 4, 3, 5, 4],
        backgroundColor: 'rgba(111, 162, 242, 0.2)',
        borderColor: 'rgba(111, 162, 242, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ width: '45%', marginRight: '5%' }}>
        <Line data={lineData} />
      </div>
      <div style={{ width: '45%' }}>
        <Radar data={radarData} />
      </div>
    </div>
  );
};

export default Dashboard;