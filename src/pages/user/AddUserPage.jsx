import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import { Button, Input } from "antd";
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
import { SearchOutlined } from "@ant-design/icons";

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
                <Input
                    className="!w-[30%]"
                    placeholder="Tìm kiếm ..."
                    allowClear
                    addonAfter={<SearchOutlined type="primary" />}
                />
            </div>
            <ModalInput></ModalInput>
            <Table></Table>
            <ModalProfile></ModalProfile>
            <ModalEnd
                setReasonForEnding={setReasonForEnding}
                reasonForEnding={reasonForEnding}
            ></ModalEnd>
            <SendLeader reasonForEnding={reasonForEnding}></SendLeader>
        </>
    );
};

export default AddUserPage;
