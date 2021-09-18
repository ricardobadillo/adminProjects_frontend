import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext'
import './Layout.css';

const Barra = () => {

    //Extraer información del Context de autenticación.
    const authsContext = useContext(AuthContext);
    const { user, returnUserAuth, logOut } = authsContext;
    
    useEffect(() => {
        returnUserAuth();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className="header">
            {user ? <p className="username">Hola <span>{user.name}</span></p>: null}
            <nav className="nav">
                <button className="enlace" onClick={() => logOut()}>Cerrar sesión</button>
            </nav>
        </header>
    )
}

export default Barra
