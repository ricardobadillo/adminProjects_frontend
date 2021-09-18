import { TAREAS_ELIMINAR, TAREAS_NUEVAS, TAREAS_PROYECTOS, TAREAS_VALIDAR, TAREA_ACTUAL, TAREA_ACTUALIZAR, TAREA_LIMPIAR } from "../../types";

const Reducer = (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTOS:
            return {
                ...state,
                taskProject: action.payload
            }

        case TAREAS_NUEVAS:
            return {
                ...state,
                taskProject: [action.payload, ...state.taskProject],
                error: false
            }

        case TAREAS_VALIDAR:
            return {
                ...state,
                error: true
            }

        case TAREAS_ELIMINAR:
            return {
                ...state,
                taskProject: state.taskProject.filter(task => task._id !== action.payload)
            }
        
        case TAREA_ACTUALIZAR:
            return {
                ...state,
                taskProject: state.taskProject.map(task => task._id === action.payload._id ? action.payload : task)
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                selectTask: action.payload
            }
        
        case TAREA_LIMPIAR:
            return {
                ...state,
                selectTask: null
            }

        default:
            return state;
    }
}

export default Reducer;