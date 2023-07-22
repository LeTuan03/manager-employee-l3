import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { isAuthenticated } = useSelector((state) => state.account);
    return (
        <>
            {
                isAuthenticated ? <>{props.children}</> : <Navigate to={'/login'}></Navigate>
            }
        </>
    );
};

export default ProtectedRoute;