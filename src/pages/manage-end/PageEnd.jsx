import React, { useEffect } from "react";
import Table from "../../components/Table";
import { useDispatch } from "react-redux";
import {
    getAllEmployee,
} from "../../redux/employee/employeeSlice";
import SaveResume from "../../components/resume/SaveResume";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
import { STATUS_EMPLOYEE } from "../../constants/constants";
const PageEnd = () => {
    const dispatch = useDispatch();
    const { ACCEPT_REQUEST_END_PROFILE, SUBMIT_FILE_SAVE } = STATUS_EMPLOYEE
    useEffect(() => {
        dispatch(getAllEmployee(`${ACCEPT_REQUEST_END_PROFILE},${SUBMIT_FILE_SAVE}`));
    }, []);
    return (
        <>
            <Table></Table>
            <ModalProfile></ModalProfile>
            <SaveResume></SaveResume>
        </>
    );
};

export default PageEnd;
