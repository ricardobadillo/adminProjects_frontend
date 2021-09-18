/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import Proyect from './Project';
import projectContext from '../../context/projects/ProjectContext';
import AlertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListProject = () => {

    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects } = projectsContext;

    const alertsContext = useContext(AlertContext);
    const { alert, showAlert } = alertsContext;

    useEffect(() => {


        //Si hay un error.
        if (message) {
            showAlert(message.message, message.category);
        }

        getProjects();
    }, [message]);

    if (projects.length === 0) return <p>No hay proyectos</p>

    return (
        <ul className="list_project">
            {alert ? <p className={`alert ${alert.category}`}>{alert.message}</p> : null}

            <TransitionGroup>
                {
                    projects.map(project => (
                        <CSSTransition
                            classNames="project"
                            key={project._id}
                            timeout={500}
                        >
                            <Proyect
                                project = {project}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ul>
    )
}

export default ListProject;