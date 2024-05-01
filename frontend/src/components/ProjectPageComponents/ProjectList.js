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
        <Container style={{ flex: '1', height: '100%', width: '100%', margin: '0', paddingRight: '0', paddingLeft: '0' }} fluid>
            {newProjectScreen && <NewProjectScreen closeNewProjectScreen={() => setNewProjectScreen(false)} />}
            <Row style={{ minHeight: '100%', margin: '0', width: '100%', height: '100%', flex: '1'}}>
                <Col md={4} className={st.projectListColumn}>
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
                        <Button style={{marginTop: '1.5vh', width: '50%', marginLeft: '25%'}} variant="primary" onClick={() => {
                            setNewProjectScreen(true);
                        }}>Create new project</Button>
                    </ListGroup>
                </Col>
                <Col style={{ paddingTop: '12px' }}>
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