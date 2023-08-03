import React, { useEffect, useState } from "react";
import EmployeeProfile from "./EmployeeProfile";
import { Button, Modal, Space, Tag } from "antd";
import { updateEmployee } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    resetEmployee,
    setOpen,
} from "../../redux/employee/employeeSlice";
import { STATUS } from "../../constants/constants";
import { format } from "date-fns";

const ModalProfile = ({ employeeId }) => {
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
    const [threeInfo, setThreeInfo] = useState({
        knowledge: employee.knowledge || "",
        skill: employee.skill || "",
        activity: employee.activity || "",
    });
    const handleUpdateEmployee = async (data) => {
        const res = await updateEmployee(employeeId, data);
        if (res?.data?.code === STATUS.SUCCESS) {
            dispatch(
                setOpen({ ...open, modalInput: false, modalProfile: false })
            );
            dispatch(getAllEmployee("1,2,4,5"));
        }
    };

    return (
        <>
            <Modal
                width={1300}
                className="max-h-[720px] overflow-y-hidden"
                title={
                    <div className="flex justify-between mr-10">
                        HỒ SƠ NHÂN VIÊN
                        {employee?.numberSaved && (
                            <i className="text-green-600">
                                Số lưu:{" "}
                                <span className="font-normal">
                                    {employee?.numberSaved}
                                </span>{" "}
                                - Ngày lưu:{" "}
                                <span className="font-normal">
                                    {format(
                                        new Date(employee?.submitDay).getTime(),
                                        "yyyy/MM/dd"
                                    )}
                                </span>
                            </i>
                        )}
                    </div>
                }
                centered
                open={open.modalProfile}
                onOk={() => {
                    dispatch(setOpen({ ...open, modalProfile: false }));
                }}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalProfile: false }));
                    dispatch(resetEmployee());
                }}
                footer={
                    <div className="flex justify-center">
                        {["1", "5"].includes(employee.submitProfileStatus) && (
                            <Button
                                type="primary"
                                danger
                                onClick={() => {
                                    handleUpdateEmployee({
                                        ...employee,
                                        ...threeInfo,
                                    });
                                }}
                            >
                                Lưu
                            </Button>
                        )}
                        {employee.submitProfileStatus === "7" && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    dispatch(
                                        setOpen({ ...open, modalResume: true })
                                    );
                                }}
                            >
                                Nộp lưu hồ sơ
                            </Button>
                        )}
                        {employee.submitProfileStatus === "9" && (
                            <Button
                                danger
                                onClick={() => {
                                    dispatch(
                                        setOpen({ ...open, modalEnd: true })
                                    );
                                }}
                            >
                                Kết thúc
                            </Button>
                        )}
                        {["1", "5", "4"].includes(
                            employee.submitProfileStatus
                        ) && (
                            <Button
                                htmlType="submit"
                                type="primary"
                                onClick={() => {
                                    dispatch(
                                        setOpen({
                                            ...open,
                                            modalSendLeader: true,
                                        })
                                    );
                                }}
                            >
                                Trình lãnh đạo
                            </Button>
                        )}
                        <Button
                            danger
                            type="primary"
                            onClick={() => {
                                dispatch(
                                    setOpen({ ...open, modalProfile: false })
                                );
                                dispatch(resetEmployee());
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <EmployeeProfile
                    threeInfo={threeInfo}
                    setThreeInfo={setThreeInfo}
                ></EmployeeProfile>
            </Modal>
        </>
    );
};

export default ModalProfile;
