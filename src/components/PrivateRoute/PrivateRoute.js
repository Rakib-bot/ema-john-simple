import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../../App';
const PrivateRoute = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const location = useLocation();
    console.log("ekhane:",loggedInUser.email)
    if(!loggedInUser || !loggedInUser.email)
    {
        return <Navigate to="/login" state={{ from: location }}/>
    }
    return children;

};

export default PrivateRoute;