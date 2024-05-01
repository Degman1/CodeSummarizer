import react, { useState, useEffect } from 'react'
import st from './SummariesScreen.module.css'
function SummariesScreen({ backFunc, selectedProject }) {

    const [viewing, setViewing] = useState('code')
    const [summaries, setSummaries] = useState([])

    const fetchUserRequests = async () => {
        try {
            const response = await fetch(`http://localhost:4000/get_responses?request_id=${encodeURIComponent(selectedProject.request_id)}`);
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

    const submitRating = async (responseId, rating) => {
        const data = {
            response_id: responseId,
            rating: rating
        };

        try {
            const response = await fetch('http://localhost:4000/rate_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();  // Parse as JSON
            console.log(result);
            return result;
        } catch (error) {
            console.error('Failed to post rating:', error);
            return null;
        }
    };


    useEffect(() => {
        console.log(selectedProject)
        fetchUserRequests().then(data => {
            console.log(data)
            setSummaries(data)
        })
    }, [])

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

    const buildRatingArea = (summaryIndex) => {
        let responesId = summaries[summaryIndex].response_id;
        return (
            <>
                <p>Summary #{summaryIndex + 1}</p>
                <p>This summary was generated in the 'XXXX' and 'YYYYY' styles.</p>
                <p>This is currently rated: {summaries[summaryIndex].rating || '-'}/5</p>
                <div className={st.ratingsRow}>
                    <button onClick={() => submitRating(responesId, 1)}>1</button>
                    <button onClick={() => submitRating(responesId, 2)}>2</button>
                    <button onClick={() => submitRating(responesId, 3)}>3</button>
                    <button onClick={() => submitRating(responesId, 4)}>4</button>
                    <button onClick={() => submitRating(responesId, 5)}>5</button>
                </div>
            </>
        )
    }

    let summaryNum = viewing[viewing.length - 1] - 1;
    return (
        <div className={st.container}>
            <div className={st.topBar}>
                <span
                    onClick={backFunc}
                    className={st.backArrow}
                >{"<"}</span>
                <span className={st.projectName}>{selectedProject.title || `Untitled Project ${selectedProject.request_id}`}</span>
                <span className={st.projectId}>#{selectedProject.projectId}</span>
                <label for='contentViewed'>View:
                    <select
                        name='contentViewed'
                        onChange={(e) => setViewing(e.target.value)}
                    >
                        <option value='code'>Code</option>
                        {summaries.map((summary, i) => {
                            return <option value={`summary${i + 1}`}>{`Summary ${i + 1}`}</option>
                        })}
                    </select>
                </label>

            </div>
            <div className={st.bottomContent}>
                <div className={st.summaryText}>
                    {viewing === 'code' && buildCodeSnippetArea(selectedProject.prompt)}
                    {viewing !== 'code' && buildSummaryTextArea(summaries?.[summaryNum]?.text)}
                </div>
                <div className={st.ratingArea}>
                    {viewing === 'code' && <p>Select a summary in the 'View' dropdown to rate</p>}
                    {viewing !== 'code' && buildRatingArea(summaryNum)}
                </div>
            </div>
        </div>
    )
}

export default SummariesScreen