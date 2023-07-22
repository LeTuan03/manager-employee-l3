import React from 'react';
import { useSelector } from 'react-redux';

const RoleUserRoute = (props) => {
    const { role } = useSelector((state) => state.account);
    return (
        <>
            { role===4 ? <>{props.children}</> :<>User moi vao dc</> }
        </>
    );
};

export default RoleUserRoute;