import react, { useState } from 'react'
import st from './SummariesScreen.module.css'
function SummariesScreen({ backFunc, selectedProject }) {

    const [viewing, setViewing] = useState('code')
    const [summaries, setSummaries] = useState({
        summary1: 'long chatgpt generated summary1', summary2: 'long chatgpt generated summary2',
        summary3: 'long chatgpt generated summary3', summary4: 'long chatgpt generated summary4. long chatgpt generated summary4 long chatgpt generated summary4. long chatgpt generated summary4 long chatgpt generated summary4. long chatgpt generated summary4 long chatgpt generated summary4. long chatgpt generated summary4 long chatgpt generated summary4. long chatgpt generated summary4 long chatgpt generated summary4. long chatgpt generated summary4 long chatgpt generated summary4. long chatgpt generated summary4 long chatgpt generated summary4. long chatgpt generated summary4 '
    })

    const buildCodeSnippetArea = (code) => {
        return (<div className={st.summaryArea}>
            <pre>{code}</pre>
        </div>)
    }

    const buildSummaryTextArea = (summary) => {
        return (<div className={st.summaryArea}>
            <pre>{summary}</pre>
        </div>)
    }

    const buildRatingArea = () => {
        const names = {
            summary1: 'Summary 1', summary2: 'Summary 2', summary3: 'Summary 3', summary4: 'Summary 4'
        }
        return (
            <>
                <p>{names[viewing]}</p>
                <p>This summary was generated in the 'XXXX' and 'YYYYY' styles.</p>
                <button>Chose as preferred style</button>
            </>
        )
    }

    return (
        <div className={st.container}>
            <div className={st.topBar}>
                <span
                    onClick={backFunc}
                    className={st.backArrow}
                >{"<"}</span>
                <span className={st.projectName}>{selectedProject.name}</span>
                <span className={st.projectId}>#{selectedProject.projectId}</span>
                <label for='contentViewed'>View:
                    <select
                        name='contentViewed'
                        onChange={(e) => setViewing(e.target.value)}
                    >
                        <option value='code'>Code</option>
                        <option value='summary1'>Summary 1</option>
                        <option value='summary2'>Summary 2</option>
                        <option value='summary3'>Summary 3</option>
                        <option value='summary4'>Summary 4</option>
                    </select>
                </label>

            </div>
            <div className={st.bottomContent}>
                <div className={st.summaryText}>
                    {viewing === 'code' && buildCodeSnippetArea(selectedProject.codeSnippet)}
                    {viewing !== 'code' && buildSummaryTextArea(summaries?.[viewing])}
                </div>
                <div className={st.ratingArea}>
                    {viewing === 'code' && <p>Select a summary in the 'View' dropdown to rate</p>}
                    {viewing !== 'code' && buildRatingArea()}
                </div>
            </div>
        </div>
    )
}

export default SummariesScreen