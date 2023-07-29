import React from 'react';
import { useSelector } from 'react-redux';

const RoleUserRoute = (props) => {
    const { role } = useSelector((state) => state.account);
    return (
        <>
            {role === props.role ? <>{props.children}</> : <>403</>}
        </>
    );
};

export default RoleUserRoute;