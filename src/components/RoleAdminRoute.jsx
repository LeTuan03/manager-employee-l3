import React from "react";
import { useSelector } from "react-redux";

const RoleAdminRoute = (props) => {
    const { role } = useSelector((state) => state.account);
    return <>{role === 3 ? <>{props.children}</> : <>403</>}</>;
};

export default RoleAdminRoute;
