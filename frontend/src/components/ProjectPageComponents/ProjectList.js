import st from './ProjectList.module.css'
import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import NewProjectScreen from './NewProjectScreen'
import SummariesScreen from './SummariesScreen'

function ProjectList() {

    // example data, not sure what format the data will be in yet especially the code snippets
    // description is a user submitted description of the project for identification, not one of the code summaries that chat gpt produces
    const [projects, setProjects] = useState([{
        name: "Homework 1",
        projectId: 1,
        author: "Jake",
        timestamp: 1711289604028,
        codeSnippet: `const hello = (name) => {
            return "Hello, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "Homework 2",
        projectId: 2,
        author: "Jake",
        timestamp: 1712299504028,
        codeSnippet: `const hello = (name) => {
            return "What is up brother, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "Cool Evaluation",
        projectId: 3,
        author: "Sivan",
        timestamp: 1613299604028,
        codeSnippet: `
        const buildProjectRow = (project) => {
            return (
                <div
                    className={st.projectRow}
                    onClick={() => setSelectedProject((old) => old === project ? null : project)}
                >
                    <div className={st.projectName}>{project.name}</div>
                    <div className={st.projectAuthor}>{project.author}</div>
                    <div className={st.projectTimestamp}>{buildDate(project.timestamp)}</div>
                </div>
            )
        }
    
        const buildCodeSnippet = (code) => {
            return (<div className={st.codeSnippet}>
                <pre>{code}</pre>
            </div>)
        }
    
        const buildProjectDetails = (project) => {
            return (<div className={st.projectDetails}>
                <div className={st.topRow}>
                    <span>{project.name}</span>
                </div>
                <div className={st.middleRow}>
                    <p>{project.description}</p>
                </div>
                <div className={st.bottomRow}>
                    <p>
                        {project.author} <small>{buildDate(project.timestamp)}</small>
                    </p>
                    <button>View Summaries</button>
                </div>
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
        `,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "Technical Interview",
        projectId: 4,
        author: "David",
        timestamp: 1313299604028,
        codeSnippet: `const hello = (name) => {
            return "Greetings, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        name: "January Code Review",
        projectId: 5,
        author: "Harry",
        timestamp: 1313299604028,
        codeSnippet: `const hello = (name) => {
            return "Hi, " + name
        }`,
        description: `lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
          ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
           magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
             enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    }, {
        name: "Code Report",
        projectId: 6,
        author: "Misha",
        timestamp: 1222299604028,
        codeSnippet: `const hello = (name) => {
            return "Hey, " + name
        }`,
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
    ])
    const [newProjectScreen, setNewProjectScreen] = useState(false)

    // should this be a copy of the object or just the key, then we .find() in code? figure out later
    const [selectedProject, setSelectedProject] = useState('')
    const [viewingSummaries, setViewingSummaries] = useState(false)

    // fetch functions and calling

    const fetchUserRequests = async (username) => {
        try {
            const response = await fetch(`http://localhost:4000/all_user_information`);
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

    useEffect(() => {
        fetchUserRequests('Jake').then((data) => {
            console.log(data);
        });
    }, [])

    // build functions

    const buildDate = (timestamp) => new Date(timestamp).toLocaleDateString()

            const handleProjectSelect = (project) => {
                setSelectedProject(selectedProject === project ? null : project);
            };

            if (viewingSummaries && selectedProject) {
                return (
                    <SummariesScreen
                        backFunc={() => setViewingSummaries(false)}
                        selectedProject={selectedProject}
                    />
                );
            }

            const buildProjectRow = (project) => {
                return (
                    <div
                        className={st.projectRow}
                        onClick={() => setSelectedProject((old) => old === project ? null : project)}
                        key={project.projectId}
                    >
                        <div className={st.projectName}>{project.name}</div>
                        <div className={st.projectAuthor}>{project.author}</div>
                        <div className={st.projectTimestamp}>{buildDate(project.timestamp)}</div>
                    </div>
                )
            }

            const buildCodeSnippet = (code) => {
                return (<div className={st.codeSnippet}>
                    <pre>{code}</pre>
                </div>)
            }

            const buildProjectDetails = (project) => {
                return (<div className={st.projectDetails}>
                    <div className={st.topRow}>
                        <span>{project.name} <i className={st.projectId}>#{project.projectId}</i></span>
                        <p>
                            {project.author} <small>{buildDate(project.timestamp)}</small>
                        </p>
                    </div>
                    <div className={st.middleRow}>
                        <p>{project.description}</p>
                    </div>
                    <div className={st.bottomRow}>
                        <button onClick={() => setViewingSummaries(true)}>View Summaries</button>
                    </div>
                </div>)
            }

            if (viewingSummaries) {
                return (<div className={st.content}>
                    <SummariesScreen
                        backFunc={() => setViewingSummaries(false)}
                        selectedProject={selectedProject}
                    />
                </div>)
            }

    return (
        <Container fluid className="custom-container"> 
            {newProjectScreen && <NewProjectScreen closeNewProjectScreen={() => setNewProjectScreen(false)} />}
            <Row className="custom-row"> 
                <Col md={4} className="project-list-column">
                    <ListGroup>
                        {projects.map(project => (
                            <ListGroup.Item
                                key={project.projectId}
                                action
                                onClick={() => handleProjectSelect(project)}
                                active={selectedProject === project}
                            >
                                {project.name} - {project.author}
                                <div><small>{new Date(project.timestamp).toLocaleDateString()}</small></div>
                            </ListGroup.Item>
                        ))}
                        <Button variant="primary" onClick={() => setNewProjectScreen(true)}>Create new project</Button>
                    </ListGroup>
                </Col>
                <Col md={8} className="project-details-column"> 
                    {selectedProject ? (
                        <Card>
                            <Card.Header>{selectedProject.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Description</Card.Title>
                                <Card.Text>{selectedProject.description}</Card.Text>
                                <Card.Title>Code Snippet</Card.Title>
                                <pre>{selectedProject.codeSnippet}</pre>
                            </Card.Body>
                        </Card>
                    ) : (
                        <div>Select a project for details</div>
                    )}
                </Col>
            </Row>
        </Container>
    );
    
    
}

export default ProjectList;