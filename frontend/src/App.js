import React, { useState } from 'react';
import './App.css';
import SummaryScreen from './screens/SummaryScreen';
import StatScreen from './screens/StatsScreen';
import AccountScreen from './screens/AccountScreen';

function App() {
  
  // state that holds current subpage, selected in nav bar ('summaries', 'stats', 'settings') etc
  const [subPage, setSubpage] = useState('')


  const buildNavButton = (page) => {
    return (
      <button
        onClick={() => setSubpage(page)}
      >{page}</button>
    )
  }

  const buildSubPage = () => {
    switch (subPage) {
      case 'Summaries':
        return <SummaryScreen />
      case 'Stats':
        return <StatScreen />
      case 'Account':
        return <AccountScreen />
      default:
        return <div>Invalid page</div>
    }
  }

  return (
    <div className="page">
      <div className='app'>
        <div className='nav-bar'>
          {buildNavButton('Summaries')}
          {buildNavButton('Stats')}
          {buildNavButton('Account')}
        </div>
        <div className='page-content'>
          {buildSubPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
