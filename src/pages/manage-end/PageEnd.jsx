import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import { useDispatch } from "react-redux";
import { getAllEmployee, getEmployee } from "../../redux/employee/employeeSlice";
import SaveResume from '../../components/resume/SaveResume'
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
const PageEnd = () => {
    const [employeeId, setEmployeeId] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllEmployee("7,0"))
    }, []);
    useEffect(() => {
        if (employeeId) {
            dispatch(getEmployee(employeeId));
        }
    }, [employeeId]);
    return (
        <>
            <ModalInput
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
            ></ModalInput>
            <Table
                setEmployeeId={setEmployeeId}
            ></Table>
            <ModalProfile employeeId={employeeId}></ModalProfile>
            <SaveResume employeeId={employeeId}></SaveResume>
        </>
    );
};

export default PageEnd;