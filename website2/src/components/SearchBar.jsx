import React from 'react';
import { MDBInputGroup, MDBBtn, MDBIcon, MDBInput, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';

const SearchBar = ({ onSearch, filters, setFilters, preventClose, getSchoolText, getYearText, getSemesterText }) => {
  const { schoolId, year, semester, query } = filters;

  const handleDropdownClick = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  return (
    <div className="text-center my-5">
        <MDBInputGroup className="w-auto">
          <MDBDropdown onClick={preventClose}>
            <MDBDropdownToggle color="primary">{getSchoolText()}</MDBDropdownToggle>
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
            <MDBDropdownToggle color="primary">{getYearText()}</MDBDropdownToggle>
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
            <MDBDropdownToggle color="primary">{getSemesterText()}</MDBDropdownToggle>
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

          <MDBInput
          label="Search Courses"
          value={query}
          labelClass="text-white"
          style={{ backgroundColor: '#3f3f3f' }}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />

          <MDBBtn color="primary" onClick={onSearch}>
            <MDBIcon icon="search" />
          </MDBBtn>
          
        </MDBInputGroup>
    </div>
  );
};

export default SearchBar;
