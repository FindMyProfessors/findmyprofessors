import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  useColorModes,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilCart,
  cilCheckAlt,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSearch,
  cilSun,
} from '@coreui/icons';

import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './header/index';

const AppHeader = ({ onSearch }) => {
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');

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

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

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
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <div className="flex-grow-1 d-flex justify-content-center">
          <CInputGroup style={{ maxWidth: '80vh' }}>
            <CDropdown variant="input-group" onClick={preventClose}>
              <CDropdownToggle color="primary">{getSchoolText()}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleDropdownClick('schoolId', 1)}>
                  UCF {schoolId === 1 && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownClick('schoolId', 2)}>
                  Valencia {schoolId === 2 && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownClick('schoolId', 3)}>
                  Other {schoolId === 3 && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown variant="input-group" onClick={preventClose}>
              <CDropdownToggle color="primary">{getYearText()}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleDropdownClick('year', 2023)}>
                  2023 {year === 2023 && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownClick('year', 2024)}>
                  2024 {year === 2024 && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownClick('year', 2025)}>
                  2025 {year === 2025 && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown variant="input-group" onClick={preventClose}>
              <CDropdownToggle color="primary">{getSemesterText()}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleDropdownClick('semester', 'Fall')}>
                  Fall {semester === 'Fall' && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownClick('semester', 'Spring')}>
                  Spring {semester === 'Spring' && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownClick('semester', 'Summer')}>
                  Summer {semester === 'Summer' && <CIcon icon={cilCheckAlt} />}
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CFormInput type="search" placeholder="Search Courses" value={query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
            <CInputGroupText>
              <CButton type="button" color="primary" onClick={onSearch}>
                <CIcon icon={cilSearch} />
              </CButton>
            </CInputGroupText>
          </CInputGroup>
        </div>

        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilCart} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
