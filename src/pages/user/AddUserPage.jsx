import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import { Button } from "antd";
import ModalEnd from "../../components/modal-quit-job/ModalEnd";
import SendLeader from "../../components/modal-send-leader/SendLeader";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    resetEmployee,
    setOpen,
} from "../../redux/employee/employeeSlice";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
import { STATUS_EMPLOYEE } from "../../constants/constants";

const { NEW_SAVE, PENDING, ADDITIONAL_REQUIREMENTS, REJECT } = STATUS_EMPLOYEE;
const AddUserPage = () => {
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
            <ModalInput></ModalInput>
            <Table></Table>
            <ModalProfile></ModalProfile>
            <ModalEnd
                setReasonForEnding={setReasonForEnding}
                reasonForEnding={reasonForEnding}
            ></ModalEnd>
            <SendLeader
                reasonForEnding={reasonForEnding}
            ></SendLeader>
        </>
    );
};

export default AddUserPage;
