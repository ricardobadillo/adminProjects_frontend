import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OBTENER_USUARIO
} from '../../types/index';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        authentication: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    
    const registerUser = async (datos) => {
        try {
            const respuesta = await clientAxios.post('/api/users', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

        //Obtener el usuario autenticado.
        returnUserAuth();

        } catch (error) {
            //console.log(error.response.data.message);
            const alert = {
                message: error.response.data.message,
                category: 'alert-error'
            }
            
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            })
        }
    }

    const returnUserAuth = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clientAxios.get('/api/auth');
            //console.log(respuesta);

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.user
            });

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR

            });
        }
    }

    const logIn = async (datos) => {
        try {
            const respuesta = await clientAxios.post('/api/auth', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario autenticado.
            returnUserAuth();

        } catch (error) {
            //console.log(error.response.data.message);
            const alert = {
                message: error.response.data.message,
                category: 'alert-error'
            }
            
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    const LogOut = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authentication: state.authentication,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                logIn,
                returnUserAuth,
                LogOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;