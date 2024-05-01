import st from "./StatsScreen.module.css";
import react, { useState } from "react";

function StatScreen() {
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
        {BuildGraph(0, 0, graph_title)}
      </div>
    );
  }
  function BuildRankings() {
    return (
      <div>
        {
        Object.keys(languageData).map((key) => {
          return <li>{key}: {languageData[key]}</li>
        })
        }
      </div>
    );
  }

  function BuildGraph(data, graph_type, graph_title) {
    return <div></div>;
  }

  return (
    <div className={st.container}>
      <div className={st.leftColumn}>
        <h1 className={st.header}>Coding Languages</h1>
        <div className={st.dataBlock}>
          <div className={st.graphArea}>GRAPH AREA</div>
          <div className={st.detailsArea}>DETAILS AREA</div>
        </div>
        <h1 className={st.header}>Style Preferences</h1>
        <div className={st.dataBlock}>
          <div className={st.graphArea}>GRAPH AREA</div>
          <div className={st.detailsArea}>DETAILS AREA</div>
        </div>
      </div>

      <div className={st.rightColumn}>
        <h1 className={st.header}>User Info</h1>
        <div className={st.dataBlock}>
          <div className={st.userDetailsArea}>DETAILS AREA</div>
        </div>
        <h1 className={st.header}>Style Preferences</h1>
        <div className={st.dataBlock}>
          <div className={st.userDetailsArea}>User Data</div>
        </div>
      </div>
    </div>
  );
}

export default StatScreen;
