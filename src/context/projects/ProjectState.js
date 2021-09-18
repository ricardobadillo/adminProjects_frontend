import { useReducer } from 'react';
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import 
    { 
        FORMULARIO, 
        OBTENER_PROYECTOS, 
        AGREGAR_PROYECTOS, 
        MOSTRAR_ERROR, 
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR 
    } from '../../types/index';
import clientAxios from '../../config/axios';

const ProjectState = (props) => {

    const initialState = {
        projects: [],
        newProject: false,
        error: false,
        projectSelect: null,
        message: null
    }

    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    const showFormulario = () => {
        dispatch({
            type: FORMULARIO
        })
    };

    const getProjects = async () => {
        try {
            const resultado = await clientAxios.get('/api/projects');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.projects
            })

        } catch (error) {

            const alert = {
                message: 'Hubo un error',
                category: 'alert-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            })
        }
    }

    const addProjects = async (project) => {

        try {
            const resultado = await clientAxios.post('/api/projects', project);

            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data
            });

        } catch (error) {

            const alert = {
                message: 'Hubo un error',
                category: 'alert-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            })
        }
    }

    const showError = () => {
        dispatch({
            type: MOSTRAR_ERROR
        });
    }

    const currentProject = (projectSelectID) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: projectSelectID
        });
    }

    const deleteProject = async (projectSelectID) => {
        try {
            await clientAxios.delete(`/api/projects/${projectSelectID}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: projectSelectID
            })

        } catch (error) {

            const alert = {
                message: 'Hubo un error',
                category: 'alert-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alert
            })
        }
    }

    return(
        <ProjectContext.Provider
            value={{
                newProject: state.newProject,
                projects: state.projects,
                error: state.error,
                projectSelect: state.projectSelect,
                message: state.message,
                showError,
                showFormulario,
                getProjects,
                addProjects,
                deleteProject,
                currentProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;