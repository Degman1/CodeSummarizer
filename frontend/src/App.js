// 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import ProjectList from './components/ProjectPageComponents/ProjectList';
import StatScreen from './components/StatsPageComponents/StatsScreen';
import AccountDropdown from './components/AccountDropdownComponents/AccountDropdown';
import HomePage from './components/HomePageComponents/HomePage';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './components/contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';

function App() {
  const [error, setError] = useState("")
  const [subPage, setSubpage] = useState('login');
  const [openAccountTab, setOpenAccountTab] = useState(false);
  const { currentUser, logout } = useAuth() || {};
  const navigate = useNavigate();
  const buildNavButton = (page) => {
    return (
      <Button variant="primary" onClick={() => {
        setSubpage(page);
        setOpenAccountTab(false);
      }}>
        {page}
      </Button>
    );
  };

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login'); // Use navigate to redirect
    } catch {
      setError('Failed to log out');
    }
  }

  const buildSubPage = () => {
    switch (subPage) {
      case 'login':
        return <Login />;
      case 'Home':
        return <HomePage />;
      case 'Projects':
        return <ProjectList />;
      case 'Stats':
        return <StatScreen />;
      default:
        return <div>Invalid page</div>;
    }
  };

  const NavigationBar = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 navbar-custom">
        <Navbar.Brand href="#home">Code Summarizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link-custom" onClick={() => setSubpage('Home')}>Home</Nav.Link>
            <Nav.Link className="nav-link-custom" onClick={() => setSubpage('Projects')}>Projects</Nav.Link>
            <Nav.Link className="nav-link-custom" onClick={() => setSubpage('Stats')}>Stats</Nav.Link>
          </Nav>
          <Nav className="nav-right">
            <NavDropdown title={<i className="bi bi-person-circle" style={{ fontSize: '1.5rem', cursor: 'pointer' }} />} id="nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const Footer = () => (
    <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      © 2024 Code Summarizer
    </div>
  );

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100vw' }}>
      <Router >
        <AuthProvider>
          <NavigationBar />
          <Container className="d-flex align-items-center justify-content-center" style={{ height: "100%", flex: '1' }}>
            <div style={{ height: '100%', width: '100%', flex: '1' }}>
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={buildSubPage()} />
                <Route path="/projects" element={buildSubPage()} />
                <Route path="/stats" element={buildSubPage()} />
              </Routes>
            </div>
          </Container>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );

}

export default App;
