import st from './ProjectList.module.css'
import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import NewProjectScreen from './NewProjectScreen'
import SummariesScreen from './SummariesScreen'

function ProjectList() {

    // example data, not sure what format the data will be in yet especially the code snippets
    // description is a user submitted description of the project for identification, not one of the code summaries that chat gpt produces
    const [projects, setProjects] = useState([])
    const [newProjectScreen, setNewProjectScreen] = useState(false)

    // should this be a copy of the object or just the key, then we .find() in code? figure out later
    const [selectedProject, setSelectedProject] = useState('')
    const [viewingSummaries, setViewingSummaries] = useState(false)

    // fetch functions and calling

    const fetchUserRequests = async (username) => {
        try {
            const response = await fetch(`http://localhost:4000/get_user_requests?username=${encodeURIComponent(username)}`);
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
        fetchUserRequests('dgerard').then((data) => {
            setProjects(data)
            console.log(data)
        });
    }, [])

    // build functions

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

    return (
        <Container fluid>
            {newProjectScreen && <NewProjectScreen closeNewProjectScreen={() => setNewProjectScreen(false)} />}
            <Row>
                <Col md={4} className="project-list-column">
                    <ListGroup>
                        {projects.map(project => (
                            <ListGroup.Item
                                key={project.request_id}
                                action
                                onClick={() => handleProjectSelect(project)}
                                active={selectedProject === project}
                            >
                                {project.title || `Untitled Project ${project.request_id}`}
                                <div><small>{new Date(project.creation_date).toLocaleDateString()}</small></div>
                            </ListGroup.Item>
                        ))}
                        <Button variant="primary" onClick={() => {
                            setNewProjectScreen(true);
                        }}>Create new project</Button>
                    </ListGroup>
                </Col>
                <Col md={8}>
                    {selectedProject ? (
                        <Card>
                            <Card.Header>{selectedProject.title || `Untitled Project ${selectedProject.request_id}`}</Card.Header>
                            <Card.Body>
                                <Card.Title>Code Snippet</Card.Title>
                                <pre>{selectedProject.prompt}</pre>
                                <Card.Title>Description</Card.Title>
                                <Card.Text>{selectedProject.description}
                                </Card.Text>
                                <button onClick={() => setViewingSummaries(true)}>View Summaries</button>
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