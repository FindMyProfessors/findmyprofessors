import React, { useState } from 'react';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,

  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Line, Radar } from 'react-chartjs-2';
import 'chart.js/auto';


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
    professor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentProfessors.map((professor, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(professor)}>
                <td>
                  <MDBIcon icon={isExpanded && selectedProfessor === professor ? 'angle-up' : 'angle-down'} />
                </td>

                <td>{professor.fullName}</td>
                <td>{professor.averageGrade}</td>
                <td>{professor.averageQuality}</td>
                <td>{professor.averageDifficulty}</td>
                <td>{professor.recentQualityAverage}</td>
                <td>{professor.recentDifficultyAverage}</td>
                <td>{professor.ratingsCount}</td>
              </tr>
              {selectedProfessor === professor && isExpanded && (
                <tr>
                  <td colSpan="8">
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '45%', marginRight: '5%' }}>
        <Line data={lineData} />
      </div>
      <div style={{ width: '45%' }}>
        <Radar data={radarData} />
      </div>
    </div>
  );
};

export default ProfessorTable;
