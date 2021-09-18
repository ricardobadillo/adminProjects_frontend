import React, { useContext } from 'react';
import projectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';
import './Projects.css';


const Project = ({ project }) => {

    const projectsContext = useContext(projectContext);
    const {currentProject} = projectsContext;

    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext;

    const selectProject = (id) => {
        currentProject(id);
        getTasks(id);
    }

    return (
        <li className="item_list">
            <button
                className="button_list"
                onClick={() => selectProject(project._id)}
                type="button"
            >
                {project.name}
            </button>
        </li>
    )
}

export default Project;