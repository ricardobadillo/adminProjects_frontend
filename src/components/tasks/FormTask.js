import React, { useState, useEffect, useContext } from 'react';
import projectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';
import './Tasks.css';

const FormTask = () => {

    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);
    const { projectSelect } = projectsContext;
    const { selectTask, error, getTasks, addTasks, validarTask, updateTask, cleanTask } = tasksContext;
    
    useEffect(()=> {
        if (selectTask !== null){
            setTask(selectTask);
        } else {
            setTask({
                name: ''
            })
        }


    }, [selectTask]);

    const [task, setTask] = useState({
        name: '',
    });

    const {name} = task;

    if (!projectSelect) return null;

    const [currentProject] = projectSelect;
    
    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            validarTask();
            return;
        }

        if (selectTask === null) {
            task.project = currentProject._id;
            addTasks(task);

        } else {
            updateTask(task);

            // Elimina tarea seleccionada del State.
            cleanTask();
        }

        getTasks(currentProject.id);

        setTask({
            name: ''
        });
    }

    return (
        <div className="div_form_task">
            <form className="form_task" onSubmit={handleSubmit}>
                <div className="container_input">
                    <input
                        className="input_task"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nombre de la tarea"
                        type="text"
                        value={name}
                    />
                </div>
                <div className="container_input">
                    <input 
                        className="button_task"
                        type="submit"
                        value={selectTask ? "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>

            {
                error ? <h2 className="title_task red">El nombre de la tarea es obligatorio</h2> 
                : null
            }

        </div>
    )
}

export default FormTask;
