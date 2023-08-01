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
const Employee = () => {
    const [employeeId, setEmployeeId] = useState(null);
    const [reasonForEnding, setReasonForEnding] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEmployee("3,6,8,9"));
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
            <ModalProfile employeeId={employeeId}></ModalProfile>
            <ModalEnd
                employeeId={employeeId}
                setReasonForEnding={setReasonForEnding}
                reasonForEnding={reasonForEnding}
            ></ModalEnd>
            <SendLeader
                employeeId={employeeId}
                reasonForEnding={reasonForEnding}
            ></SendLeader>
            <UpdateHappeningModal
                employeeId={employeeId}
            ></UpdateHappeningModal>
        </>
    );
};

export default Employee;
