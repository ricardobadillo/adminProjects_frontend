import React, { useEffect, useContext } from 'react';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/auth/authContext';
import './Projects.css';

const Projects = () => {

    //Extraer información del Context de autenticación.
    const authsContext = useContext(AuthContext);
    const { returnUserAuth } = authsContext;

    useEffect(() => {
        returnUserAuth();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="container_projects">
            <Sidebar />
            <div className="principal">
                <Barra />
                <main>

                    <FormTask />
                    <div className="container_tasks">
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Projects;