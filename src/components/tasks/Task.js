import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';
import './Tasks.css';

const Task = ({task}) => {

    const projectsContext = useContext(ProjectContext);
    const { projectSelect } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { getTasks, deleteTask, updateTask, currentTask } = tasksContext;

    const [currentProject] = projectSelect;

    const handleClick = () => {
        deleteTask(task._id, currentProject._id);
        getTasks(currentProject.id);
    }

    const changeStatus = (task) => {
        
        if (task.status) {
            task.status = false
        } else {
            task.status = true
        }

        updateTask(task);
    }

    const selectTask = (task) => {
        currentTask(task);
    }

    return (
        <div className="item_task">
            <li className="name">{task.name}</li>
            <div className="status">
                {
                    task.status 
                    ? 
                    <button
                        className="button_status green"
                        onClick={()=> changeStatus(task)}
                        type="button"
                    >
                        Completo    
                    </button> 
                    :
                    <button
                        className="button_status red"
                        onClick={()=> changeStatus(task)}
                        type="button"
                    >
                        Incompleto
                    </button>
                    
                }
            </div>
            <div className="actions">
                <button
                    className="button_status action"
                    onClick={()=> selectTask(task)}
                    type="button"
                >Editar</button>

                <button
                    className="button_status action"
                    onClick={handleClick}
                    type="button"
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Task;
