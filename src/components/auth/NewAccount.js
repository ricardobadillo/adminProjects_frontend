import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';
import './Formulario.css';

const NewAccount = (props) => {

    const alertsContext = useContext(AlertContext);
    const {alert, showAlert} = alertsContext;

    const authsContext = useContext(AuthContext);
    const {message, authentication, registerUser} = authsContext;

    //En caso de que el usuario ya se haya autenticado o no.
    useEffect(() => {
        if (authentication) {
            props.history.push('/projects');
        }
        
        if (message) {
            showAlert(message.message, message.category);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, authentication, props.history])


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const {name, email, password, confirmar} = user;

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validar que no haya campos vacíos.
        if (name.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' ||
            confirmar.trim() === '') {

            showAlert('Todos los campos son obligatorios', 'alert-error')
            return;
        }

        //Password con mínimo de 6 caracteres.
        if (password.length < 6) {
            showAlert('El password debe tener más de 6 caracteres', 'alert-error');
            return;
        }
        
        //Los dos password deben ser iguales.
        if (password !== confirmar){
            showAlert('Los passwords no son iguales', 'alert-error');
            return;
        }

        //Action.
        registerUser({
            name, 
            email, 
            password
        });
    }

    return (
        <div className="container_login">
            {alert ? (<h2 className={`${alert.category}`}>{alert.message}</h2>) : null}
            <div className="div_login">
                <h1 className="h1_login">Crear nueva cuenta</h1>

                <form className="form_login" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre de usuario</label>
                        <input
                            className="input_login"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            placeholder="Nombre de usuario"
                            value={name}
                            type="text"
                        />
                    </div>
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
                        <label htmlFor="confirmar">Repite password</label>
                        <input
                            className="input_login"
                            id="confirmar"
                            name="confirmar"
                            onChange={handleChange}
                            placeholder="Password"
                            value={confirmar}
                            type="password"
                        />
                    </div>
                    
                    <div>
                        <input 
                            className="button_login"
                            type="submit"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link className="link" to="/">
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
    )
}

export default NewAccount;
