import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({component: Component, ...props}) => {
    
    const authsContext = useContext(AuthContext);
    const { loading, authentication, returnUserAuth } = authsContext;

    useEffect(()=> {
        returnUserAuth();

    }, [returnUserAuth]);

    return (
        <Route {...props} render={props => !authentication  && !loading ? (
            <Redirect to="/" />
        ) 
        : (<Component {...props}/>
    )} />
    );
}

export default PrivateRoute;