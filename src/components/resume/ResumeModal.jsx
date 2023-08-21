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
import { STATUS_EMPLOYEE } from "../../constants/constants";
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
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const handleShowError = (error) => {
        console.error(error);
        dispatch(setIsLoading(false));
        message.error("Đã có lỗi xảy ra!");
    };
    const handleActionSuccess = async (type) => {
        message.success("Cập nhật thông tin nhân viên thành công!");
        switch (type) {
            case "Propose":
                await handleGetProposal();
                break;
            case "Promote":
                await handleGetProcess();
                break;
            case "IncreaseSalary":
                await getCurrentEmpIncreaseSalary();
                break;
            case "Resume":
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

    const onFinish = async (values) => {
        try {
            dispatch(setIsLoading(true));
            switch (type) {
                case "Propose":
                    profile.acceptanceDate = values.acceptDay;
                    profile.proposalStatus = "3";
                    await proposalEdit(profile);
                    await handleActionSuccess(type);
                    break;
                case "Promote":
                    profile.acceptanceDate = values.acceptDay;
                    profile.processStatus = "3";
                    await acceptPromote(profile);
                    await handleActionSuccess(type);
                    break;
                case "IncreaseSalary":
                    profile.acceptanceDate = values.acceptDay;
                    profile.salaryIncreaseStatus = "3";
                    await salaryApprove(profile);
                    await handleActionSuccess(type);
                    break;
                case "Resume":
                    let data = {};
                    if (profile.submitProfileStatus === "6") {
                        data = {
                            ...employee,
                            terminationAppointmentDate: values.acceptDay,
                            submitProfileStatus: "7",
                        };
                    } else {
                        data = {
                            ...employee,
                            appointmentDate: values.acceptDay,
                            submitProfileStatus: "3",
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
            form3.resetFields();
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
        }
    };

    const onFinishAdditional = async (values) => {
        try {
            dispatch(setIsLoading(true));
            switch (type) {
                case "Propose":
                    profile.additionalRequest = values.additionalRequest;
                    profile.proposalStatus = "4";
                    await proposalEdit(profile);
                    await handleActionSuccess(type);
                    break;
                case "Promote":
                    profile.additionalRequest = values.additionalRequest;
                    profile.processStatus = "4";
                    await acceptPromote(profile);
                    await handleActionSuccess(type);
                    break;
                case "IncreaseSalary":
                    profile.additionalRequest = values.additionalRequest;
                    profile.salaryIncreaseStatus = "4";
                    await salaryApprove(profile);
                    await handleActionSuccess(type);
                    break;
                case "Resume":
                    let data = {};
                    if (profile.submitProfileStatus === "6") {
                        data = {
                            ...employee,
                            submitProfileStatus: "8",
                            additionalRequestTermination:
                                values.additionalRequest,
                        };
                    } else {
                        data = {
                            ...employee,
                            additionalRequest: values.additionalRequest,
                            submitProfileStatus: "4",
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
            form.resetFields();
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
        }
    };

    const onFinishReject = async (values) => {
        try {
            dispatch(setIsLoading(true));
            switch (type) {
                case "Propose":
                    profile.rejectionDate = values.rejectionDate;
                    profile.reasonForRefusal = values.reasonForRejection;
                    profile.proposalStatus = "5";
                    await proposalEdit(profile);
                    await handleActionSuccess(type);
                    break;
                case "Promote":
                    profile.rejectionDate = values.rejectionDate;
                    profile.reasonForRefusal = values.reasonForRejection;
                    profile.processStatus = "5";
                    await rejectPromote(profile);
                    await handleActionSuccess(type);
                    break;
                case "IncreaseSalary":
                    profile.rejectionDate = values.rejectionDate;
                    profile.reasonForRefusal = values.reasonForRejection;
                    profile.salaryIncreaseStatus = "5";
                    await salaryApprove(profile);
                    await handleActionSuccess(type);
                    break;
                case "Resume":
                    let data = {};
                    if (profile.submitProfileStatus === "6") {
                        data = {
                            ...employee,
                            refuseEndProfileDay: values.rejectionDate,
                            reasonForRefuseEndProfile:
                                values.reasonForRejection,
                            submitProfileStatus: "9",
                        };
                    } else {
                        data = {
                            ...employee,
                            reasonForRejection: values.reasonForRejection,
                            submitProfileStatus: "5",
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
            form2.resetFields();
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
                form3={form3}
            />
            <ModalAdditional
                isAdditionalRequestOpen={isAdditionalRequestOpen}
                setIsAdditionalRequestOpen={setIsAdditionalRequestOpen}
                form={form}
                onFinishAdditional={onFinishAdditional}
            />
            <ModalReject
                isRejectOpen={isRejectOpen}
                setIsRejectOpen={setIsRejectOpen}
                form2={form2}
                onFinishReject={onFinishReject}
            />
        </>
    );
}
