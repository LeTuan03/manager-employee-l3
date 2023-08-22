import React, { useState } from "react";
import EmployeeProfile from "./EmployeeProfile";
import { Button, Modal, message } from "antd";
import { updateEmployee } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    setIsLoading,
    setOpen,
} from "../../redux/employee/employeeSlice";
import {
    ACTIVE_KEY,
    ROLE,
    STATUS,
    STATUS_EMPLOYEE,
} from "../../constants/constants";
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
    const { open, employee } = useSelector((state) => state.employee);
    const [threeInfo, setThreeInfo] = useState({
        knowledge: employee?.knowledge || "",
        skill: employee?.skill || "",
        activity: employee?.activity || "",
    });
    const [errorThreeInfo, setErrorThreeInfo] = useState({
        knowledge: "",
        skill: "",
        activity: "",
    });

    const [activeKey, setActiveKey] = useState(ACTIVE_KEY);
    const handleUpdateEmployee = async (data) => {
        try {
            dispatch(setIsLoading(true));
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
            dispatch(setIsLoading(false));
        } catch (error) {
            console.log(error);
            message.error("Đã có lỗi!");
            dispatch(setIsLoading(false));
        }
    };
    const validateInfo = () => {
        let isValid = true;
        const newErrors = { ...errorThreeInfo };
        if (threeInfo?.knowledge?.trim() === "" || !threeInfo?.knowledge) {
            isValid = false;
            newErrors.knowledge = "Vui lòng nhập học vấn của bạn";
        } else {
            newErrors.knowledge = "";
        }
        if (threeInfo?.skill?.trim() === "" || !threeInfo?.skill) {
            isValid = false;
            newErrors.skill = "Vui lòng nhập kĩ năng của bạn";
        } else {
            newErrors.skill = "";
        }
        if (threeInfo?.activity?.trim() === "" || !threeInfo?.activity) {
            isValid = false;
            newErrors.activity = "Vui lòng nhập hoạt động của bạn";
        } else {
            newErrors.activity = "";
        }
        setErrorThreeInfo(newErrors);
        return isValid;
    };
    const handleSubmit = () => {
        if (validateInfo()) {
            handleUpdateEmployee({
                ...employee,
                knowledge: threeInfo?.knowledge?.trim(),
                skill: threeInfo?.skill?.trim(),
                activity: threeInfo?.activity?.trim(),
            });
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
                            employee.submitProfileStatus ===
                                STATUS_EMPLOYEE.SUBMIT_FILE_SAVE && (
                                <div className="mr-9 text-green-600">
                                    <i>
                                        Số lưu:{" "}
                                        <span className="font-normal">
                                            {employee?.numberSaved}
                                        </span>{" "}
                                        - Ngày lưu:{" "}
                                        <span className="font-normal">
                                            {employee?.decisionDay &&
                                                format(
                                                    new Date(
                                                        employee?.decisionDay
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
                    setActiveKey(ACTIVE_KEY);
                    dispatch(setOpen({ ...open, modalProfile: false }));
                    setErrorThreeInfo({
                        knowledge: "",
                        skill: "",
                        activity: "",
                    });
                }}
                footer={
                    <div className="flex justify-center !pb-5">
                        {[NEW_SAVE, REJECT, ADDITIONAL_REQUIREMENTS].includes(
                            employee?.submitProfileStatus
                        ) &&
                            role !== ROLE.MANAGE && (
                                <Button
                                    className="w-[100px]"
                                    type="primary"
                                    onClick={() => {
                                        handleSubmit();
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
                        {[NEW_SAVE, REJECT, ADDITIONAL_REQUIREMENTS].includes(
                            employee?.submitProfileStatus
                        ) &&
                            role !== ROLE.MANAGE && (
                                <Button
                                    className={`min-w-[100px] ${
                                        !threeInfo?.knowledge ||
                                        !threeInfo?.skill ||
                                        (!threeInfo?.activity
                                            ? ""
                                            : "hover:!bg-green-500")
                                    } bg-green-600 `}
                                    htmlType="submit"
                                    type="primary"
                                    disabled={
                                        !threeInfo?.knowledge ||
                                        !threeInfo?.skill ||
                                        !threeInfo?.activity
                                    }
                                    onClick={() => {
                                        handleUpdateEmployee({
                                            ...employee,
                                            knowledge:
                                                threeInfo?.knowledge?.trim(),
                                            skill: threeInfo?.skill?.trim(),
                                            activity:
                                                threeInfo?.activity?.trim(),
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
                                setActiveKey(ACTIVE_KEY);
                                setErrorThreeInfo({
                                    knowledge: "",
                                    skill: "",
                                    activity: "",
                                });
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <EmployeeProfile
                    setErrorThreeInfo={setErrorThreeInfo}
                    errorThreeInfo={errorThreeInfo}
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
