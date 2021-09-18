import React, { useReducer } from 'react';
import AlertReducer from './alertReducer';
import AlertContext from './alertContext';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertState = (props) => {

    const initialState = {
        alert: null,
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const showAlert = (message, category) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                message,
                category
            }
        });

        setTimeout(()=> {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;