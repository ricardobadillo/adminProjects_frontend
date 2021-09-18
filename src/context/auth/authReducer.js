import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OBTENER_USUARIO
} from '../../types/index';

const Reducer = (state, action) => {

    switch (action.type) {

        case REGISTRO_EXITOSO:
            case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                authentication: true,
                message: null,
                loading: false
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                authentication: true,
                user: action.payload,
                loading: false
            }
        
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authentication: null,
                message: action.payload,
                loading: false
            }

        default:
            return state;
    }
}

export default Reducer;