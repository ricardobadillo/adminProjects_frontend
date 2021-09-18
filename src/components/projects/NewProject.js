import React, { useState, useContext } from 'react';
import projectContext from '../../context/projects/ProjectContext';
import './Projects.css';

const NewProject = () => {

    const projectsContext = useContext(projectContext);
    const {newProject, error, showError, showFormulario, addProjects } = projectsContext;

    const [project, setProject] = useState({
        name: ''
    });

    const {name} = project;

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '') {
            showError();    
            return
        };
    
        addProjects(project);
    
        setProject({
            name: ''
        });
    }

    const handleClick = () => {
        showFormulario();
    }


    return (
        <div className="div_new_project" onSubmit={handleSubmit}>
            <button
                className="button_project"
                onClick={handleClick}
                type="button"
            >
                Nuevo proyecto
            </button>

            {
                newProject ? (
                    <form className="form_new_project">
                        <input
                            className="input_project"
                            name="name"
                            onChange={handleChange}
                            placeholder="Nombre del proyecto"
                            value={name}
                            type="text"
                        />
        
                        <input 
                            className="button_project"
                            type="submit"
                            value="Agregar proyecto"
                        />
                    </form>
                )
                : null
            }

            {
                error
                ? <p className="error">Ingrese nombre del proyecto</p>
                : null
            }

        </div>
    )
}

export default NewProject
