import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import { Button } from "antd";
import ModalEnd from "../../components/modal-quit-job/ModalEnd";
import SendLeader from "../../components/modal-send-leader/SendLeader";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    getEmployee,
    resetEmployee,
    setOpen,
} from "../../redux/employee/employeeSlice";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
import { STATUS_EMPLOYEE } from "../../constants/constants";

const { NEW_SAVE, PENDING, ADDITIONAL_REQUIREMENTS, REJECT } = STATUS_EMPLOYEE;
const AddUserPage = () => {
    const [employeeId, setEmployeeId] = useState(null);
    const [reasonForEnding, setReasonForEnding] = useState("");
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
    useEffect(() => {
        dispatch(
            getAllEmployee(
                `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`
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
            <Button
                type="primary"
                onClick={() => {
                    dispatch(setOpen({ ...open, modalInput: true }));
                    dispatch(resetEmployee());
                }}
            >
                Thêm mới
            </Button>
            <ModalInput
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
            ></ModalInput>
            <Table
                setEmployeeId={setEmployeeId}
                getAllEmployee={getAllEmployee}
            ></Table>
            <ModalProfile
                employeeId={employeeId}
                setEmployeeId={setEmployeeId}
            ></ModalProfile>
            <ModalEnd
                employeeId={employeeId}
                setReasonForEnding={setReasonForEnding}
                reasonForEnding={reasonForEnding}
            ></ModalEnd>
            <SendLeader
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
                reasonForEnding={reasonForEnding}
            ></SendLeader>
        </>
    );
};

export default AddUserPage;
