import React, { useState } from "react";
import { Button, Form, message } from "antd";
import {
    acceptEmployee,
    acceptPromote,
    proposalEdit,
    rejectPromote,
    salaryApprove,
} from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    getEmployee,
    setIsLoading,
    setOpen,
} from "../../redux/employee/employeeSlice";
import { STATUS_EMPLOYEE, TYPE_WAITING } from "../../constants/constants";
import ModalAccept from "../modal-wait-approval/ModalAccept";
import ModalAdditional from "../modal-wait-approval/ModalAdditional";
import ModalReject from "../modal-wait-approval/ModalReject";

export default function ResumeModal(props) {
    const {
        profile,
        type,
        setIsOpen,
        getCurrentEmpIncreaseSalary,
        handleGetProcess,
        handleGetProposal,
    } = props;
    const { PENDING, PROFILE_END_REQUEST } = STATUS_EMPLOYEE;
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [isAdditionalRequestOpen, setIsAdditionalRequestOpen] =
        useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [formAdditional] = Form.useForm();
    const [formReject] = Form.useForm();
    const [formAccept] = Form.useForm();
    const handleShowError = (error) => {
        console.error(error);
        dispatch(setIsLoading(false));
        message.error("Đã có lỗi xảy ra!");
    };
    const handleActionSuccess = async (type) => {
        message.success("Cập nhật thông tin nhân viên thành công!");
        switch (type) {
            case TYPE_WAITING.PROPOSE:
                await handleGetProposal();
                break;
            case TYPE_WAITING.PROMOTE:
                await handleGetProcess();
                break;
            case TYPE_WAITING.INCREASESALARY:
                await getCurrentEmpIncreaseSalary();
                break;
            case TYPE_WAITING.RESUME:
                dispatch(
                    getAllEmployee({
                        status: `${PENDING},${PROFILE_END_REQUEST}`,
                    })
                );
                break;
            default:
                break;
        }
    };

    const onFinish = async (value) => {
        try {
            dispatch(setIsLoading(true));
            const newData = {
                ...profile,
                acceptanceDate: value.acceptDay,
            };
            switch (type) {
                case TYPE_WAITING.PROPOSE:
                    newData.proposalStatus = STATUS_EMPLOYEE.BEEN_APPEOVED;
                    await proposalEdit(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.PROMOTE:
                    newData.processStatus = STATUS_EMPLOYEE.BEEN_APPEOVED;
                    await acceptPromote(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.INCREASESALARY:
                    newData.salaryIncreaseStatus =
                        STATUS_EMPLOYEE.BEEN_APPEOVED;
                    await salaryApprove(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.RESUME:
                    let data = {};
                    if (
                        profile.submitProfileStatus ===
                        STATUS_EMPLOYEE.PROFILE_END_REQUEST
                    ) {
                        data = {
                            ...employee,
                            terminationAppointmentDate: value.acceptDay,
                            submitProfileStatus:
                                STATUS_EMPLOYEE.ACCEPT_REQUEST_END_PROFILE,
                        };
                    } else {
                        data = {
                            ...employee,
                            appointmentDate: value.acceptDay,
                            submitProfileStatus: STATUS_EMPLOYEE.BEEN_APPEOVED,
                        };
                    }
                    await acceptEmployee(data);
                    await handleActionSuccess(type);
                    break;
                default:
                    break;
            }
            setIsApproveOpen(false);
            setIsOpen(false);
            formAccept.resetFields();
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
        }
    };

    const onFinishAdditional = async (value) => {
        try {
            dispatch(setIsLoading(true));
            const newData = {
                ...profile,
                additionalRequest: value.additionalRequest,
            };
            switch (type) {
                case TYPE_WAITING.PROPOSE:
                    newData.proposalStatus =
                        STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS;
                    await proposalEdit(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.PROMOTE:
                    newData.processStatus =
                        STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS;
                    await acceptPromote(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.INCREASESALARY:
                    newData.salaryIncreaseStatus =
                        STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS;
                    await salaryApprove(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.RESUME:
                    let data = {};
                    if (
                        profile.submitProfileStatus ===
                        STATUS_EMPLOYEE.PROFILE_END_REQUEST
                    ) {
                        data = {
                            ...employee,
                            submitProfileStatus:
                                STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS_END_PROFILE,
                            additionalRequestTermination:
                                value.additionalRequest,
                        };
                    } else {
                        data = {
                            ...employee,
                            additionalRequest: value.additionalRequest,
                            submitProfileStatus:
                                STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS,
                        };
                    }
                    await acceptEmployee(data);
                    await handleActionSuccess(type);
                    break;
                default:
                    break;
            }
            setIsAdditionalRequestOpen(false);
            setIsOpen(false);
            formAdditional.resetFields();
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
        }
    };

    const onFinishReject = async (value) => {
        try {
            dispatch(setIsLoading(true));
            const newData = {
                ...profile,
                rejectionDate: value.rejectionDate,
                reasonForRefusal: value.reasonForRejection,
            };
            switch (type) {
                case TYPE_WAITING.PROPOSE:
                    newData.proposalStatus = STATUS_EMPLOYEE.REJECT;
                    await proposalEdit(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.PROMOTE:
                    newData.processStatus = STATUS_EMPLOYEE.REJECT;
                    await rejectPromote(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.INCREASESALARY:
                    newData.salaryIncreaseStatus = STATUS_EMPLOYEE.REJECT;
                    await salaryApprove(newData);
                    await handleActionSuccess(type);
                    break;
                case TYPE_WAITING.RESUME:
                    let data = {};
                    if (
                        profile.submitProfileStatus ===
                        STATUS_EMPLOYEE.PROFILE_END_REQUEST
                    ) {
                        data = {
                            ...employee,
                            refuseEndProfileDay: value.rejectionDate,
                            reasonForRefuseEndProfile: value.reasonForRejection,
                            submitProfileStatus:
                                STATUS_EMPLOYEE.REJECT_REQUEST_END_PROFILE,
                        };
                    } else {
                        data = {
                            ...employee,
                            reasonForRejection: value.reasonForRejection,
                            submitProfileStatus: STATUS_EMPLOYEE.REJECT,
                        };
                    }
                    await acceptEmployee(data);
                    await handleActionSuccess(type);
                    break;
                default:
                    break;
            }
            setIsOpen(false);
            setIsRejectOpen(false);
            formReject.resetFields();
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
        }
    };

    return (
        <>
            {profile.submitProfileStatus !== STATUS_EMPLOYEE.PENDING && (
                <Button
                    className="bg-green-700 text-white min-w-[100px] hover:!text-white hover:!border-0"
                    onClick={() => {
                        dispatch(
                            getEmployee(profile?.employeeId || profile?.id)
                        );
                        dispatch(setOpen({ ...open, modalProfile: true }));
                    }}
                >
                    Xem hồ sơ
                </Button>
            )}
            <Button
                className="bg-green-700 text-white min-w-[100px] hover:!text-white hover:!border-0"
                onClick={() => setIsApproveOpen(true)}
            >
                Phê duyệt
            </Button>
            <Button
                className="min-w-[100px]"
                type="primary"
                onClick={() => setIsAdditionalRequestOpen(true)}
            >
                Yêu cầu bổ sung
            </Button>
            <Button
                className="min-w-[100px]"
                type="primary"
                danger
                onClick={() => setIsRejectOpen(true)}
            >
                Từ chối
            </Button>
            <ModalAccept
                isApproveOpen={isApproveOpen}
                setIsApproveOpen={setIsApproveOpen}
                onFinish={onFinish}
                formAccept={formAccept}
            />
            <ModalAdditional
                isAdditionalRequestOpen={isAdditionalRequestOpen}
                setIsAdditionalRequestOpen={setIsAdditionalRequestOpen}
                formAdditional={formAdditional}
                onFinishAdditional={onFinishAdditional}
            />
            <ModalReject
                isRejectOpen={isRejectOpen}
                setIsRejectOpen={setIsRejectOpen}
                formReject={formReject}
                onFinishReject={onFinishReject}
            />
        </>
    );
}
