// 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import ProjectList from './components/ProjectPageComponents/ProjectList';
import StatScreen from './components/StatsPageComponents/StatsScreen';
import AccountDropdown from './components/AccountDropdownComponents/AccountDropdown';
import HomePage from './components/HomePageComponents/HomePage';

function App() {
  const [subPage, setSubpage] = useState('Home');
  const [openAccountTab, setOpenAccountTab] = useState(false);

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

  const buildSubPage = () => {
    switch (subPage) {
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
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand href="#home">Project Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setSubpage('Home')}>Home</Nav.Link>
            <Nav.Link onClick={() => setSubpage('Projects')}>Projects</Nav.Link>
            <Nav.Link onClick={() => setSubpage('Stats')}>Stats</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setOpenAccountTab(old => !old)}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/userIcon.png`}
                alt="Account"
                style={{ cursor: 'pointer', width: 30, height: 30 }}
              />
            </Nav.Link>
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
    <div className='page'>
      <NavigationBar />
      <div className='page-content'>
        {buildSubPage()}
      </div>
      <Footer />
    </div>
  );
}

export default App;
