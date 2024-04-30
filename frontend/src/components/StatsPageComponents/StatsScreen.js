import st from './StatsScreen.module.css'

function StatScreen() {
    function BuildLeftColumn() {
        return (<div className={st.leftColumn}>{BuildDataBlockLarge('Coding Languages')}{BuildDataBlockLarge('Style Preferences')}</div>)
    }

    function BuildRightColumn() {
        return (<div className={st.rightColumn}>
                {BuildDataBlockSmall('User Info')}
                {BuildDataBlockSmall('User Data')}
            </div>)
    }
    function BuildDataBlockSmall(header) {
        return (<div className={st.smallDataBlock}>
                <h1 className={st.header}>{header}</h1>
            </div>)
    }
    function BuildDataBlockLarge(header, graph_title) {
        return (<div className={st.largeDataBlock}>
                <h1 className={st.header}>{header}</h1>
                {BuildChartRankContainer(graph_title)}
            </div>)
    }
    function BuildChartRankContainer(graph_title) {
        return (<div className={st.chartRankContainer}>
            {BuildRankings()}
            {BuildGraph(0, 0, graph_title)}
        </div>)
    }
    function BuildRankings() {
        return (<div>
            <h3>Rank</h3>
        </div>)
    }
    function BuildGraph(data, graph_type, graph_title) {
        return (<div>

        </div>)
    }
    return (
        <div className={st.container}>
            {BuildLeftColumn()}
            {BuildRightColumn()}
        </div>
    );
}

export default StatScreen