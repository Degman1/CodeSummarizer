import React, { useState } from 'react';
import './App.css';
import ProjectList from './components/ProjectPageComponents/ProjectList';
import StatScreen from './components/StatsPageComponents/StatsScreen';
import AccountDropdown from './components/AccountDropdownComponents/AccountDropdown';
import HomePage from './components/HomePageComponents/HomePage';

function App() {

  // state that holds current subpage, selected in nav bar ('summaries', 'stats', 'settings') etc
  const [subPage, setSubpage] = useState('Home')
  const [openAccountTab, setOpenAccountTab] = useState(false)


  const buildNavButton = (page) => {
    return (
      <button
        onClick={() => {
          setSubpage(page)
          setOpenAccountTab(false)
        }}
      >{page}</button>
    )

  }

  const buildSubPage = () => {
    switch (subPage) {
      case 'Home':
        return <HomePage />
      case 'Projects':
        return <ProjectList />
      case 'Stats':
        return <StatScreen />
      default:
        return <div>Invalid page</div>
    }
  }

  return (
    <div className='page'>
      <div className='app'>
        <div className='nav-bar'>
          <div className='nav-section left-aligned-nav'>
            {buildNavButton('Home')}
            {buildNavButton('Projects')}
            {buildNavButton('Stats')}
          </div>
          <div className='nav-section right-aligned-nav'>
            <button
              className='account-button'
            >
              <img
                onClick={() => setOpenAccountTab(old => !old)}
                src={`${process.env.PUBLIC_URL}/assets/settingsIcon.png`}
              />
              {openAccountTab && <AccountDropdown />}
            </button>
          </div>
        </div>
        <div className='page-content'>
          {buildSubPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
