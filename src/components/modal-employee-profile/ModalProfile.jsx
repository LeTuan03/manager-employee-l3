import React, { useState } from "react";
import EmployeeProfile from "./EmployeeProfile";
import { Button, Modal, message } from "antd";
import { updateEmployee } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";
import { ROLE, STATUS, STATUS_EMPLOYEE } from "../../constants/constants";
import { format } from "date-fns";

const {
    NEW_SAVE,
    PENDING,
    ADDITIONAL_REQUIREMENTS,
    REJECT,
    ACCEPT_REQUEST_END_PROFILE,
} = STATUS_EMPLOYEE;
const ModalProfile = () => {
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.account);
    const [loading, setLoading] = useState(false);
    const { open, employee } = useSelector((state) => state.employee);
    const [threeInfo, setThreeInfo] = useState({
        knowledge: employee?.knowledge || "",
        skill: employee?.skill || "",
        activity: employee?.activity || "",
    });
    const [activeKey, setActiveKey] = useState("1");
    const handleUpdateEmployee = async (data) => {
        try {
            setLoading(true);
            const res = await updateEmployee(employee?.id, data);
            if (res?.data?.code === STATUS.SUCCESS) {
                dispatch(
                    getAllEmployee({
                        status: `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`,
                    })
                );
                message.success("Đã lưu thành công");
            } else {
                message.error(res?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            message.error("Đã có lỗi!");
            setLoading(false);
        }
    };
    return (
        <>
            <Modal
                zIndex={4}
                width={1300}
                className="max-h-[720px] overflow-y-scroll"
                title={
                    <div className="flex justify-between">
                        <div>HỒ SƠ NHÂN VIÊN</div>
                        {employee?.numberSaved &&
                            role !== ROLE.MANAGE &&
                            employee.submitProfileStatus === "0" && (
                                <div className="mr-9 text-green-600">
                                    <i>
                                        Số lưu:{" "}
                                        <span className="font-normal">
                                            {employee?.numberSaved}
                                        </span>{" "}
                                        - Ngày lưu:{" "}
                                        <span className="font-normal">
                                            {employee?.submitDay &&
                                                format(
                                                    new Date(
                                                        employee?.submitDay
                                                    ),
                                                    "dd/MM/yyyy"
                                                )}
                                        </span>
                                    </i>
                                </div>
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
                    setActiveKey("1");
                }}
                footer={
                    <div className="flex justify-center !pb-5">
                        {[
                            NEW_SAVE,
                            REJECT,
                            ADDITIONAL_REQUIREMENTS,
                            role !== ROLE.MANAGE,
                        ].includes(employee?.submitProfileStatus) && (
                            <Button
                                className="w-[100px]"
                                type="primary"
                                loading={loading}
                                onClick={() => {
                                    handleUpdateEmployee({
                                        ...employee,
                                        knowledge: threeInfo?.knowledge?.trim(),
                                        skill: threeInfo?.skill?.trim(),
                                        activity: threeInfo?.activity?.trim(),
                                    });
                                }}
                            >
                                Lưu
                            </Button>
                        )}
                        {employee?.submitProfileStatus ===
                            ACCEPT_REQUEST_END_PROFILE &&
                            role !== ROLE.MANAGE && (
                                <Button
                                    className="min-w-[100px]"
                                    type="primary"
                                    onClick={() =>
                                        dispatch(
                                            setOpen({
                                                ...open,
                                                modalResume: true,
                                            })
                                        )
                                    }
                                >
                                    Nộp lưu hồ sơ
                                </Button>
                            )}
                        {[
                            NEW_SAVE,
                            REJECT,
                            ADDITIONAL_REQUIREMENTS,
                            role !== ROLE.MANAGE,
                        ].includes(employee?.submitProfileStatus) && (
                            <Button
                                className="min-w-[100px]  bg-green-600 hover:!bg-green-500"
                                htmlType="submit"
                                type="primary"
                                onClick={() => {
                                    handleUpdateEmployee({
                                        ...employee,
                                        knowledge: threeInfo?.knowledge?.trim(),
                                        skill: threeInfo?.skill?.trim(),
                                        activity: threeInfo?.activity?.trim(),
                                    });
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
                            className="min-w-[100px]"
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(
                                    setOpen({ ...open, modalProfile: false })
                                );
                                setActiveKey("1");
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                ></EmployeeProfile>
            </Modal>
        </>
    );
};

export default ModalProfile;
