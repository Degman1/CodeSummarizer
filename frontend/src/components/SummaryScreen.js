import st from './SummaryScreen.module.css'
import react, { useState } from 'react'

function SummaryScreen() {

    // example data
    const [projects, setProjects] = useState([{
        name: "Homework 1",
        author: "Jake",
        timestamp: 1713299604028,
        codeSnippet: `const hello = (name) => {
            return "Hello, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "Homework 2",
        author: "Jake",
        timestamp: 1713299504028,
        codeSnippet: `const hello = (name) => {
            return "What is up brother, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "Fun Evaluation",
        author: "Sivan",
        timestamp: 1713299604028,
        codeSnippet: `const hello = (name) => {
            return "Howdy, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "Technical Interview",
        author: "David",
        timestamp: 1713299604028,
        codeSnippet: `const hello = (name) => {
            return "Greetings, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "March Code Review",
        author: "Harry",
        timestamp: 1713299604028,
        codeSnippet: `const hello = (name) => {
            return "Hi, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "Code Report",
        author: "Misha",
        timestamp: 1713299604028,
        codeSnippet: `const hello = (name) => {
            return "Hey, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }])

    const [selectedProject, setSelectedProject] = useState('')

    // build functions

    const buildProjectRow = (project) => {
        return (
            <div
                className={st.projectRow}
                onClick={() => setSelectedProject((old) => old === project ? null : project)}
            >
                <div className={st.projectName}>{project.name}</div>
                <div className={st.projectAuthor}>{project.author}</div>
                <div className={st.projectTimestamp}>{project.timestamp}</div>
            </div>
        )
    }

    const buildCodeSnippet = (code) => {
        return (<div className={st.codeSnippet}>
            {code}
        </div>)
    }

    const buildProjectDetails = (project) => {
        return (<div className={st.projectDetails}>
            <div className={st.projectDescription}>{project.description}</div>
        </div>)
    }

    return (
        <div className={st.content}>
            <div className={st.summaryColumns}>
                <div className={st.projectList}>
                    {projects.map((p) => buildProjectRow(p))}
                </div>
                <div className={st.projectContent}>
                    {selectedProject && buildCodeSnippet(selectedProject.codeSnippet)}
                    {selectedProject && buildProjectDetails(selectedProject)}
                    {!selectedProject && <i className={st.noProjectSelected}>Select a project for details</i>}
                </div>
            </div>
        </div>
    );
}

export default SummaryScreen