import React, { useEffect } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import { Button } from "antd";
import SendLeader from "../../components/modal-send-leader/SendLeader";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    resetEmployee,
    setOpen,
} from "../../redux/employee/employeeSlice";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
import { STATUS_EMPLOYEE } from "../../constants/constants";
import InputSearch from "../../components/InputSearch";

const { NEW_SAVE, PENDING, ADDITIONAL_REQUIREMENTS, REJECT } = STATUS_EMPLOYEE;
const AddUserPage = () => {
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
    useEffect(() => {
        dispatch(
            getAllEmployee({
                status: `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`,
            })
        );
    }, []);

    return (
        <>
            <div className="mb-4 flex justify-between">
                <Button
                    type="primary"
                    onClick={() => {
                        dispatch(setOpen({ ...open, modalInput: true }));
                        dispatch(resetEmployee());
                    }}
                >
                    Thêm mới
                </Button>
                <InputSearch
                    status={`${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`}
                ></InputSearch>
            </div>
            <ModalInput></ModalInput>
            <Table></Table>
            <ModalProfile></ModalProfile>
            <SendLeader></SendLeader>
        </>
    );
};

export default AddUserPage;
