import React, { useEffect, useState } from "react";
import TableComponet from "../../components/Table";
import { useDispatch } from "react-redux";
import {
    getAllEmployee,
    getEmployee,
} from "../../redux/employee/employeeSlice";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";

export default function Approved() {
    const [employeeId, setEmployeeId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEmployee("3,7"));
    }, []);
    useEffect(() => {
        if (employeeId) {
            dispatch(getEmployee(employeeId));
        }
    }, [employeeId]);
    return (
        <div>
            <TableComponet setEmployeeId={setEmployeeId}></TableComponet>
            <ModalProfile
                employeeId={employeeId}
                setEmployeeId={setEmployeeId}
            />
        </div>
    );
}
