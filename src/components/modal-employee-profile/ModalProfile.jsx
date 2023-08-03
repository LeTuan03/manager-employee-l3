import React, { useEffect, useState } from "react";
import EmployeeProfile from "./EmployeeProfile";
import { Button, Modal, message } from "antd";
import { updateEmployee } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";
import { STATUS, STATUS_EMPLOYEE } from "../../constants/constants";

const {
    NEW_SAVE,
    PENDING,
    ADDITIONAL_REQUIREMENTS,
    REJECT,
    ACCEPT_REQUEST_END_PROFILE,
    REJECT_REQUEST_END_PROFILE,
} = STATUS_EMPLOYEE;
const ModalProfile = ({ employeeId, setEmployeeId }) => {
    const dispatch = useDispatch();
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
            const res = await updateEmployee(employeeId, data);
            if (res?.data?.code === STATUS.SUCCESS) {
                dispatch(
                    getAllEmployee(
                        `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`
                    )
                );
                message.success("Đã lưu thành công");
            } else {
                message.error(res?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        return () => {
            setEmployeeId(null);
        };
    }, []);
    return (
        <>
            <Modal
                zIndex={2}
                width={1300}
                className="max-h-[720px] overflow-y-hidden"
                title="Hồ sơ nhân viên"
                centered
                open={open.modalProfile}
                onOk={() => {
                    dispatch(setOpen({ ...open, modalProfile: false }));
                }}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalProfile: false }));
                    setEmployeeId(null);
                    setActiveKey("1");
                }}
                footer={
                    <div className="flex justify-center">
                        <Button
                            danger
                            onClick={() => {
                                dispatch(
                                    setOpen({ ...open, modalProfile: false })
                                );
                                setEmployeeId(null);
                                setActiveKey("1");
                            }}
                        >
                            Hủy
                        </Button>
                        {[NEW_SAVE, REJECT].includes(
                            employee.submitProfileStatus
                        ) && (
                            <Button
                                danger
                                loading={loading}
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
                        {employee.submitProfileStatus ===
                            ACCEPT_REQUEST_END_PROFILE && (
                            <Button
                                type="primary"
                                onClick={() =>
                                    dispatch(
                                        setOpen({ ...open, modalResume: true })
                                    )
                                }
                            >
                                Nộp lưu hồ sơ
                            </Button>
                        )}
                        {employee.submitProfileStatus ===
                            REJECT_REQUEST_END_PROFILE && (
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
                        {[NEW_SAVE, REJECT, ADDITIONAL_REQUIREMENTS].includes(
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
