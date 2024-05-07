// 
import React, { useState, useEffect } from 'react';
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

  async function handleLogout() {
    console.log("handleLogout is called");
    setError('');
    console.log(typeof logout);
    try {
      await logout();
      setSubpage("login")
    } catch(error) {
      setError('Failed to log out');
      console.error("Logout Error: ", error);
    }
  }

  const buildSubPage = () => {
    switch (subPage) {
      case 'login':
        return <Login setSubpage={setSubpage}/>;
      case 'signup':
        return <Signup setSubpage={setSubpage}/>;
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
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom" style={{paddingLeft: '1.4vw'}}>
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
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
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
  
  useEffect(() =>{
    if(currentUser && subPage === "login"){
      setSubpage("Home")
    }
  }, [currentUser, subPage]);

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100vw' }}>
      <Router >
        <AuthProvider>
          <NavigationBar />
          <div className="d-flex align-items-center justify-content-center" style={{ height: "100%", flex: '1', marginRight: '0', marginLeft: '0' }}>
            <div style={{ height: '100%', width: '100%', flex: '1' }}>
              {buildSubPage()}
            </div>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );

}

export default App;
