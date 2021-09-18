import { AGREGAR_PROYECTOS, ELIMINAR_PROYECTO, FORMULARIO, MOSTRAR_ERROR, OBTENER_PROYECTOS, PROYECTO_ACTUAL, PROYECTO_ERROR } from "../../types";

const Reducer = (state, action) => {
    switch(action.type) {

        case FORMULARIO:
            return {
                ...state,
                newProject: true
            }

        case OBTENER_PROYECTOS:
            return {
                ...state,
                projects: action.payload
            }
            
        case AGREGAR_PROYECTOS:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                newProject: false,
                error: false
            }
        
        case MOSTRAR_ERROR:
            return {
                ...state,
                error: true
            }
        
        case PROYECTO_ACTUAL:
            return {
                ...state,
                projectSelect: state.projects.filter(project => project._id === action.payload)
            }
        
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                projectSelect: null
            }
        
        case PROYECTO_ERROR:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state;
    }
}

export default Reducer;