/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';
import './Formulario.css';

const Login = (props) => {

    const alertsContext = useContext(AlertContext);
    const {alert, showAlert} = alertsContext;

    const authsContext = useContext(AuthContext);
    const {message, authentication, logIn} = authsContext;

    //En caso de que el password o el usuario no exista.
    useEffect(() => {
        if (authentication) {
            props.history.push('/projects');
        }
        
        if (message) {
            showAlert(message.message, message.category);
        }

    }, [message, authentication, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validar que no haya campos vacíos.
        if (email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alert-error');
        }
        
        //Action.
        logIn({
            email, 
            password
        });
    }

    return (
        <div className="container_login">
            {alert ? (<h2 className={`${alert.category}`}>{alert.message}</h2>) : null}

            <div className="div_login">
                <h1 className="h1_login">Iniciar sesión</h1>

                <form className="form_login" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="input_login"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            value={email}
                            type="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="input_login"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            value={password}
                            type="password"
                        />
                    </div>
                    
                    <div>
                        <input 
                            className="button_login"
                            type="submit"
                            value="Iniciar sesión"
                        />
                    </div>
                </form>

                <Link className="link" to="/new-account">
                    Crear cuenta
                </Link>
            </div>
        </div>
    )
}

export default Login;
