import React, { useContext } from 'react'
import Task from './Task';
import projectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Tasks.css';

const ListTasks = () => {
    
    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);

    const { projectSelect, deleteProject } = projectsContext;
    const {taskProject } = tasksContext;

    if (!projectSelect) return <h2 className="title_task">Selecciona un proyecto</h2>
    
    const [currentProject] = projectSelect;

    const handleClick = () => {
        deleteProject(currentProject._id);
    }

    return (
        <>    
            <h2 className="title_task">Proyecto: {currentProject.name}</h2>
            <ul className="list_task">
                {
                    taskProject.length === 0
                    ? (<h2 className="item_task">No hay tareas asignadas</h2>)
                    : 
                    <TransitionGroup>
                    {
                        taskProject.map(task => (
                            <CSSTransition
                                classNames="task"
                                key={task._id}
                                timeout={500}
                            >
                                <Task task={task} />
                            </CSSTransition>
                        ))
                    }
                    </TransitionGroup>
                }
            </ul>

            <button className="button" onClick={handleClick} type="button">Eliminar proyecto &times;</button>
        </>
    )
}

export default ListTasks;