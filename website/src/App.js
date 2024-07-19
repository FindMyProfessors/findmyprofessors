import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const About = React.lazy(() => import('./views/pages/about/About'));
const Contact = React.lazy(() => import('./views/pages/contact/Contact'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  const [showTable, setShowTable] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    schoolId: null,
    year: null,
    semester: null,
    query: '',
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, [isColorModeSet, setColorMode, storedTheme]);

  const handleSearch = () => {
    const { schoolId, year, semester, query } = filters;
    const params = {
      school_id: schoolId,
      year: year,
      semester: semester,
      query: query,
    };

    const queryString = new URLSearchParams(params).toString();
    fetch(`/courses/search?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setShowTable(true);
      })
      .catch((error) => console.error('Error fetching courses:', error));
  };

  return (
    <HashRouter>
      <Suspense fallback={<CSpinner color="primary" variant="grow" />}>
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={<Login />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          />
          <Route
            exact
            path="/about"
            name="About"
            element={<About />}
          />
          <Route
            exact
            path="/contact"
            name="Contact"
            element={<Contact />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            element={<Page404 />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            element={<Page500 />}
          />
          <Route
            path="*"
            name="Home"
            element={<DefaultLayout handleSearch={handleSearch} setFilters={setFilters} filters={filters} showTable={showTable} courses={courses} />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
