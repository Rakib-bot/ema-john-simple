import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../App';
const PrivateRoute = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    console.log("ekhane:",loggedInUser.email)
    if(!loggedInUser.email)
    {
        return <Navigate to="/login"/>
    }
    return children;

};

export default PrivateRoute;