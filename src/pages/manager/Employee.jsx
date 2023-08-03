import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import ModalEnd from "../../components/modal-quit-job/ModalEnd";
import SendLeader from "../../components/modal-send-leader/SendLeader";
import {
    getAllEmployee,
    getEmployee,
} from "../../redux/employee/employeeSlice";
import UpdateHappeningModal from "../../components/update-happening/UpdateHappeningModal";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
import { useDispatch } from "react-redux";
import { STATUS_EMPLOYEE } from "../../constants/constants";
const Employee = () => {
    const [employeeId, setEmployeeId] = useState(null);
    const [reasonForEnding, setReasonForEnding] = useState("");
    const {
        BEEN_APPEOVED,
        PROFILE_END_REQUEST,
        ADDITIONAL_REQUIREMENTS_END_PROFILE,
        REJECT_REQUEST_END_PROFILE,
    } = STATUS_EMPLOYEE;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            getAllEmployee(
                `${BEEN_APPEOVED},${PROFILE_END_REQUEST},${ADDITIONAL_REQUIREMENTS_END_PROFILE},${REJECT_REQUEST_END_PROFILE}`
            )
        );
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
            <Table setEmployeeId={setEmployeeId}></Table>
            <ModalProfile
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
            ></ModalProfile>
            <ModalEnd
                employeeId={employeeId}
                setReasonForEnding={setReasonForEnding}
                reasonForEnding={reasonForEnding}
            ></ModalEnd>
            <UpdateHappeningModal
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
            ></UpdateHappeningModal>
            <SendLeader
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
                reasonForEnding={reasonForEnding}
                setReasonForEnding={setReasonForEnding}
            ></SendLeader>
        </>
    );
};

export default Employee;
