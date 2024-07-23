import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBInputGroup, MDBBtn, MDBIcon, MDBInput, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import Header from './Header';
import debounce from 'lodash.debounce';
import { Line, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

import { API_URL } from '../constants';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    year: null,
    semester: null,
    query: '',
    schoolId: null,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [professorsData, setProfessorsData] = useState([]);
  const [headersVisible, setHeadersVisible] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [courseId, setCourseId] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addClassMessage, setAddClassMessage] = useState('');

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
        const response = await fetch(`${API_URL}/schools/search?name=University of Central Florida`, {
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
    localStorage.setItem('course_id', courseId);

    if (token) {
      try {
        const response = await fetch(`${API_URL}/courses/${courseId}/professors?year=${year}&semester=${semester}`, {
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
        const response = await fetch(`${API_URL}/courses/search?school_id=${schoolId}&year=${year}&semester=${semester}&query=${query}`, {
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
          setSearchResults(data.edges.slice(0, 5).map(edge => edge.node)); // Only show top 5 results
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

  const fetchProfessorRatings = async (professorId, topKPercentage) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch(`${API_URL}/professors/${professorId}/rating?topKPercentage=${topKPercentage}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Professor ratings received:', data);
          return data;
        } else {
          console.error('Failed to fetch professor ratings:', response.statusText);
          return null;
        }
      } catch (error) {
        console.error('Error fetching professor ratings:', error);
        return null;
      }
    } else {
      console.error('No token found');
      return null;
    }
  };

  const fetchProfessorAnalysis = async (professorId) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch(`${API_URL}/professors/${professorId}/analysis`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Professor analysis received:', data);
          return data;
        } else {
          console.error('Failed to fetch professor analysis:', response.statusText);
          return null;
        }
      } catch (error) {
        console.error('Error fetching professor analysis:', error);
        return null;
      }
    } else {
      console.error('No token found');
      return null;
    }
  };

  const debouncedFetchCourses = debounce((query) => {
    if (schoolId) {
      fetchCourses(schoolId, year, semester, query);
      setShowSuggestions(true);
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
      setHeadersVisible(false);
      setShowSuggestions(false); // Hide the suggested courses
      fetchCourses(schoolId, year, semester, query);
    } else {
      console.error('No school selected');
    }
  };

  const handleCartClick = async () => {
    setCartVisible(!cartVisible);
    if (!cartVisible) {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await fetch(`${API_URL}/users/${userId}/cart`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setCartItems(data.entries.map(entry => ({
              firstName: entry.professor.first_name,
              lastName: entry.professor.last_name,
              code: entry.course.code,
              courseName: entry.course.name,
              professorId: entry.professor.id,
              courseId: entry.course.id
            })));
          } else {
            console.error('Failed to fetch cart data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      } else {
        console.error('No user ID found');
      }
    }
  };

  const handleDeleteClick = async (professorId, courseId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const userId = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');

      if (userId && token) {
        try {
          const response = await fetch(`${API_URL}/users/${userId}/cart`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ professor_id: professorId, course_id: courseId })
          });

          if (response.ok) {
            setCartItems((prevItems) => prevItems.filter(item => !(item.professorId === professorId && item.courseId === courseId)));
          } else {
            console.error('Failed to delete item from cart:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting item from cart:', error);
        }
      } else {
        console.error('No user ID or token found');
      }
    }
  };

  return (
    <>
      <Header />

      <style>{'body { background-color: #FFFFFF; }'}</style>

      <MDBContainer fluid className="d-flex justify-content-center align-items-center">
        <div className="text-center">

          {headersVisible && (
            <>
              <h1 className="display-4 fw-bold" style={{ color: 'black' }}>
                FIND MY PROFESSORS
              </h1>

              <h2 style={{ color: 'black' }}>
                A better way to search for professors
              </h2>
            </>
          )}

          <div className="text-center my-5">
            <div className="search-container position-relative d-inline-block">
              <MDBInputGroup className="w-auto">
                <MDBDropdown onClick={preventClose}>
                  <MDBDropdownToggle color="primary">{schoolId ? "University of Central Florida" : "Select School"}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={handleSchoolClick}>
                      University of Central Florida {schoolId && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                <MDBDropdown onClick={preventClose}>
                  <MDBDropdownToggle color="primary">{getYearText()}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('year', 2024)}>
                      2024 {year === 2024 && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('year', 2025)}>
                      2025 {year === 2025 && <MDBIcon icon="check" />}</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

                <MDBDropdown onClick={preventClose}>
                  <MDBDropdownToggle color="primary">{getSemesterText()}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('semester', 'FALL')}>
                      Fall {semester === 'FALL' && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => handleDropdownClick('semester', 'SPRING')}>
                      Spring {semester === 'SPRING' && <MDBIcon icon="check" />}
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                <MDBInput
                  labelClass="text-black"
                  style={{ backgroundColor: '#FFFFFF', color: 'black', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.75)' }}
                  contrast
                  label="Search Courses"
                  value={query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
                <MDBBtn color="primary" onClick={handleSearchClick}>
                  <MDBIcon icon="search" />
                </MDBBtn>
                <MDBBtn color="primary" onClick={handleCartClick}>
                  <MDBIcon icon="shopping-cart" /> Cart
                </MDBBtn>
              </MDBInputGroup>

              {showSuggestions && searchResults.length > 0 && (
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

          {addClassMessage && (
            <div className="alert alert-success" role="alert">
              {addClassMessage}
            </div>
          )}

          {cartVisible && (
            <div className="my-4">
              <MDBBtn color="secondary" onClick={() => setCartVisible(false)}>
                Go Back to Professors
              </MDBBtn>
              <CartTable cartItems={cartItems} handleDeleteClick={handleDeleteClick} />
            </div>
          )}

          {!headersVisible && professorsData.length > 0 && !cartVisible && (
            <div className="my-4">
              <ProfessorTable
                professors={professorsData}
                fetchProfessorRatings={fetchProfessorRatings}
                fetchProfessorAnalysis={fetchProfessorAnalysis}
                setAddClassMessage={setAddClassMessage}
              />
            </div>
          )}
        </div>
      </MDBContainer>
    </>
  );
};

const ProfessorTable = ({ professors, fetchProfessorRatings, fetchProfessorAnalysis, setAddClassMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [ratingsData, setRatingsData] = useState({});
  const [analysisData, setAnalysisData] = useState({});
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

  const handleRowClick = async (professor) => {
    setSelectedProfessor(professor);
    const ratings = await fetchProfessorRatings(professor.id, 30); // Fetch ratings for the selected professor
    const analysis = await fetchProfessorAnalysis(professor.id); // Fetch analysis for the selected professor
    setRatingsData((prevRatingsData) => ({
      ...prevRatingsData,
      [professor.id]: ratings,
    }));
    setAnalysisData((prevAnalysisData) => ({
      ...prevAnalysisData,
      [professor.id]: analysis,
    }));
  };

  const handleAddClick = async (event, professor) => {
    event.stopPropagation(); // Prevent the event from propagating to the row click
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const courseId = localStorage.getItem('course_id');

    if (token && userId) {
      try {
        console.log('Sending request with data:', { professorId: professor.id, courseId }); // Debugging log
        const response = await fetch(`${API_URL}/users/${userId}/cart`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ professor_id: professor.id, course_id: courseId })
        });

        if (response.ok) {
          setAddClassMessage(`Class added: ${professor.first_name} ${professor.last_name}`);
          setTimeout(() => setAddClassMessage(''), 3000);
          console.log('Professor added to cart successfully');
        } else {
          console.error('Failed to add professor to cart:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding professor to cart:', error);
      }
    } else {
      console.error('No token or user ID found');
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
            <th>Recent Average Difficulty</th>
            <th>Recent Average Quality</th>
            <th>Total Difficulty Average</th>
            <th>Total Quality Average</th>
            <th>Ratings Count</th>
            <th>Add</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentProfessors.map((professor, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(professor)}>
                <td>
                  <MDBIcon icon={selectedProfessor === professor ? 'angle-up' : 'angle-down'} />
                </td>
                <td>{professor.first_name + ' ' + professor.last_name}</td>
                <td>{ratingsData[professor.id] ? ratingsData[professor.id].averageGrade : '-'}</td>
                <td>{ratingsData[professor.id] ? roundToTenth(ratingsData[professor.id].topKMostRecentDifficultyAverage) : '-'}</td>
                <td>{ratingsData[professor.id] ? roundToTenth(ratingsData[professor.id].topKMostRecentQualityAverage) : '-'}</td>
                <td>{ratingsData[professor.id] ? roundToTenth(ratingsData[professor.id].totalDifficultyAverage) : '-'}</td>
                <td>{ratingsData[professor.id] ? roundToTenth(ratingsData[professor.id].totalQualityAverage) : '-'}</td>
                <td>{ratingsData[professor.id]?.ratingAmount || '-'}</td>
                <td>
                  <MDBBtn style={{ backgroundColor: 'rgb(0, 102, 0)', color: 'white' }} size="sm" onClick={(event) => handleAddClick(event, professor)}>Add</MDBBtn>
                </td>
              </tr>
              {selectedProfessor === professor && (
                <tr>
                  <td colSpan="9">
                    <ProfessorDetails professor={professor} analysisData={analysisData[professor.id]} />
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

const CartTable = ({ cartItems, handleDeleteClick }) => {
  return (
    <MDBTable responsive>
      <MDBTableHead dark>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Code</th>
          <th>Course Name</th>
          <th>Delete</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.code}</td>
            <td>{item.courseName}</td>
            <td>
              <MDBBtn color="danger" size="sm" onClick={() => handleDeleteClick(item.professorId, item.courseId)}>
                Delete
              </MDBBtn>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

const ProfessorDetails = ({ professor, analysisData }) => {
  const lineData = {
    labels: analysisData ? analysisData.averageRatingValues.map(item => `${item.month} ${item.year}`) : [],
    datasets: [
      {
        label: 'Rating Over Time',
        data: analysisData ? analysisData.averageRatingValues.map(item => item.value) : [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };

  const radarData = {
    labels: analysisData ? analysisData.tagAmount.map(tag => tag.tag) : [],
    datasets: [
      {
        label: 'Professor Feedback',
        data: analysisData ? analysisData.tagAmount.map(tag => tag.amount) : [],
        backgroundColor: 'rgba(111, 162, 242, 0.2)',
        borderColor: 'rgba(111, 162, 242, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ width: '45%', marginRight: '5%' }}>
        <Line data={lineData} options={lineOptions} />
      </div>
      <div style={{ width: '45%' }}>
        <Radar data={radarData} />
      </div>
    </div>
  );
};

const roundToTenth = (num) => {
  return num ? Math.round(num * 10) / 10 : 'N/A';
};

export default Dashboard;
