import React, { useState } from 'react';
import './App.css';
import ProjectList from './components/ProjectList';
import StatScreen from './components/StatsScreen';
import AccountDropdown from './components/AccountDropdown';

function App() {

  // state that holds current subpage, selected in nav bar ('summaries', 'stats', 'settings') etc
  const [subPage, setSubpage] = useState('Projects')
  const [openAccountTab, setOpenAccountTab] = useState(false)


  const buildNavButton = (page) => {
    return (
      <button
        onClick={() => setSubpage(page)}
      >{page}</button>
    )

  }

  const buildSubPage = () => {
    switch (subPage) {
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
            {buildNavButton('Projects')}
            {buildNavButton('Stats')}
          </div>
          <div className='nav-section right-aligned-nav'>
            <button
              className='account-button'
              onClick={() => setOpenAccountTab(old => !old)}>
              GEAR
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
