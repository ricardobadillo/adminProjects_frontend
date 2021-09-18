import React, { useReducer } from 'react';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';

import {
    TAREAS_ELIMINAR,
    TAREAS_NUEVAS,
    TAREAS_PROYECTOS,
    TAREAS_VALIDAR,
    TAREA_ACTUAL,
    TAREA_ACTUALIZAR,
    TAREA_LIMPIAR
    } from '../../types/index';
import clientAxios from '../../config/axios';


const TaskState = (props) => {

    const initialState = {
        taskProject: [],
        error: false,
        selectTask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getTasks = async (project) => {

        try {
            const resultado = await clientAxios.get('/api/tasks', { params: {project}} );
            //console.log(resultado);

            dispatch({
                type: TAREAS_PROYECTOS,
                payload: resultado.data.tasks

            });

        } catch (error) {
            console.log(error);
        }
    }

    const addTasks = async (task) => {
        try {
            const resultado = clientAxios.post('/api/tasks/', task);
            console.log(resultado);

            dispatch({
                type: TAREAS_NUEVAS,
                payload: task
            });

        } catch (error) {
            console.log(error);
        }
    }

    const validarTask = () => {
        dispatch({
            type: TAREAS_VALIDAR
        });
    }

    const deleteTask = async (id, project) => {
        try {
            await clientAxios.delete(`/api/tasks/${id}`, {params: {project}});

            dispatch({
                type: TAREAS_ELIMINAR,
                payload: id
            });

        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (task) => {

        try {
            const resultado = await clientAxios.put(`/api/tasks/${task._id}`, task)

            dispatch({
                type: TAREA_ACTUALIZAR,
                payload: resultado.data.task
            });

        } catch (error) {
            
        }
    }

    const currentTask = (task) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: task
        });
    }

    const cleanTask = () => {
        dispatch({
            type: TAREA_LIMPIAR
        });
    }

    return (
        <TaskContext.Provider
            value={{
                taskProject: state.taskProject,
                selectTask: state.selectTask,
                error: state.error,
                getTasks,
                addTasks,
                validarTask,
                deleteTask,
                currentTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
};

export default TaskState;
