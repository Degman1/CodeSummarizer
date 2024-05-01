import React from "react";
import st from "./StatsScreen.module.css";
import react, { useState , useEffect } from "react";
import { Chart } from "react-google-charts";

function StatScreen() {

  const fetchUserInformation = async (username) => {
    try {
        const response = await fetch(`http://localhost:4000/user_information?username=${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user requests:', error);
        return null;
    }
  };

  fetchUserInformation('dgerard').then((data) => {
      console.log(data);
  });

  const fetchStatistics = async (username) => {
    try {
        const response = await fetch(`http://localhost:4000/user_statistics?username=${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user requests:', error);
        return null;
    }
  };

  fetchStatistics('dgerard').then((data) => {
      console.log(data)
  });

  const pieChartData = [
    ["Language", "Count"],
    ["Java", 2],
    ["Python", 5],
    ["Javascript", 3]
  ];

  const barChartData = [
    ["Style", "Score", {role: "style"}],
    ["style1", 3, "green"],
    ["style2", 3, "gold"],
    ["style3", 1, "blue"],
    ["style4", 7, "red"],
    ["style5", 0, "yellow"],
    ["style6", 2, "orange"]
  ];

  const [styleData, setStyleData] = useState({
    style1: 3,
    style2: 3,
    style3: 1,
    style4: 7,
    style5: 0,
    style6: 2,
  });

  const [languageData, setLanguageData] = useState({
    Java: 2,
    Python: 5,
    Javascript: 3,
  });

  const [userInfo, setUserInfo] = useState({
    Name: 'Jacob Sweet',
    Email: 'jacobsweet@umass.edu',
  });

  const [userData, setUserData] = useState({
    'Account Created': '5/1/2024',
    'Summary Count' : 10
  });

  const pieChartOptions = {
    piehole: 0.4,
    is3d: false
  }

  const barChartOptions = {
    
  }


  function BuildDataBlock(header, graph = null) {
    return (
      <div className={st.dataBlock}>
        <h1 className={st.header}>{header}</h1>
        {graph && BuildChartRankContainer(graph)}
        {BuildChartRankContainer()}
      </div>
    );
  }
  function BuildChartRankContainer(graph_title) {
    return (
      <div className={st.chartRankContainer}>
        {BuildRankings()}
        {BuildChart(0, 0, graph_title)}
      </div>
    );
  }
  function BuildRankings(data) {
    const sortedArray = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const sortedDictionary = Object.fromEntries(sortedArray);
    return (
      <div>
        <h3>Ranks</h3>
        <ol className={st.outerList}>
          {
          Object.keys(sortedDictionary).map((key) => {
            return <li className={st.listItem}>{key}: {sortedDictionary[key]}</li>
          })
          }
        </ol>
      </div>
    );
  }
  function BuildChart(data, options, graph_type) {
    if (graph_type == 'pie') {
      return (<div>
        <Chart
          chartType="PieChart"
          height="100%"
          width="100%"
          data={data}
          options={options}
        />
        </div>);
    }
    else if (graph_type == 'bar') {
      return (<div>
        <Chart
          chartType="ColumnChart"
          data={data}
          options={options}
          width="95%"
        />
        </div>);
    }
  }
  function BuildUser(data) {
    return (
    <div>
      <ul className={st.userData}>
          {
          Object.keys(data).map((key) => {
            return <li className={st.listItem}>{key}: {data[key]}</li>
          })
          }
        </ul>
    </div>
    )
  }

  return (
    <div className={st.container}>
      <div className={st.leftColumn}>
        <h1 className={st.header}>Coding Languages</h1>
        <div className={st.dataBlock}>
          <div className={st.detailsArea}>
            {BuildRankings(languageData)}
          </div>
          <div className={st.graphArea}>
            {BuildChart(pieChartData, pieChartOptions, 'pie')}
          </div>
        </div>
        <h1 className={st.header}>Style Preferences</h1>
        <div className={st.dataBlock}>
          <div className={st.detailsArea}>
            {BuildRankings(styleData)}
          </div>
          <div className={st.graphArea}>
            {BuildChart(barChartData, barChartOptions, 'bar')}
          </div>
        </div>
      </div>

      <div className={st.rightColumn}>
        <h1 className={st.header}>User Info</h1>
        <div className={st.dataBlock}>
          <div className={st.userDetailsArea}>
            {BuildUser(userInfo)}
          </div>
        </div>
        <h1 className={st.header}>User Data</h1>
        <div className={st.dataBlock}>
          <div className={st.userDetailsArea}>
            {BuildUser(userData)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatScreen;
