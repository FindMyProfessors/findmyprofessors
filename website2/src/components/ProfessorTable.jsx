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
  MDBBtn
} from 'mdb-react-ui-kit';

const ProfessorTable = ({ professors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProfessors = professors.filter(professor =>
    professor.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfessors = filteredProfessors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProfessors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol size="4">
          <MDBInput label="Course code" value={searchTerm} onChange={handleSearch} />
        </MDBCol>
        <MDBCol size="4" offset="4" className="text-end">
          <MDBBtn>Sign In</MDBBtn>
          <MDBBtn className="ms-2">Sign Up</MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBTable responsive>
        <MDBTableHead dark>
          <tr>
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
            <tr key={index}>
              <td>{professor.fullName}</td>
              <td>{professor.averageGrade}</td>
              <td>{professor.averageQuality}</td>
              <td>{professor.averageDifficulty}</td>
              <td>{professor.recentQualityAverage}</td>
              <td>{professor.recentDifficultyAverage}</td>
              <td>{professor.ratingsCount}</td>
            </tr>
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

export default ProfessorTable;
