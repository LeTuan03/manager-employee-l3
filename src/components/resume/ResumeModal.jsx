import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
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
    setOpen,
} from "../../redux/employee/employeeSlice";
import ModalProfile from "../modal-employee-profile/ModalProfile";
import { STATUS_EMPLOYEE } from "../../constants/constants";

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
    const [info, setInfo] = useState({ ...employee });
    useEffect(() => {
        setInfo({ ...employee });
    }, [employee]);
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
                            ...info,
                            terminationAppointmentDate: values.acceptDay,
                            submitProfileStatus: "7",
                        };
                    } else {
                        data = {
                            ...info,
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
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishAdditional = async (values) => {
        try {
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
                            ...info,
                            submitProfileStatus: "8",
                            additionalRequestTermination:
                                values.additionalRequest,
                        };
                    } else {
                        data = {
                            ...info,
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
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishReject = async (values) => {
        try {
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
                            ...info,
                            refuseEndProfileDay: values.rejectionDate,
                            reasonForRefuseEndProfile:
                                values.reasonForRejection,
                            submitProfileStatus: "9",
                        };
                    } else {
                        data = {
                            ...info,
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
        } catch (error) {
            console.log(error);
        }
    };
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    return (
        <>
            {profile.submitProfileStatus !== STATUS_EMPLOYEE.PENDING && (
                <Button
                    className="bg-green-700 text-white min-w-[100px] hover:!text-white hover:!border-0"
                    onClick={() => {
                        if (type === "Resume") {
                            dispatch(getEmployee(profile?.id));
                        } else {
                            dispatch(getEmployee(profile?.employeeId));
                        }
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
            <div>
                {/* Hồ sơ nhân viên  */}
                {type === "Resume" && <ModalProfile />}
                {/* Phê duyệt nhân viên */}
                <Modal
                    title="Phê duyệt nhân viên"
                    centered
                    open={isApproveOpen}
                    onCancel={() => setIsApproveOpen(false)}
                    footer={false}
                >
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            remember: true,
                            acceptDay: format(new Date(), "yyyy-MM-dd"),
                        }}
                        form={form3}
                    >
                        <Form.Item
                            className="mt-4"
                            label=" Ngày hẹn:"
                            name="acceptDay"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ngày",
                                },
                            ]}
                        >
                            <Input
                                type="date"
                                placeholder="Chọn ngày"
                                style={{ width: "470px" }}
                            />
                        </Form.Item>
                        <Checkbox checked className="mt-2">
                            Đã đủ điều kiện phê duyệt
                        </Checkbox>
                        <Form.Item className="text-center mt-8">
                            <Button
                                className="mr-2 min-w-[100px]"
                                key="submit"
                                type="primary"
                                htmlType="submit"
                            >
                                Xác nhận
                            </Button>
                            <Button
                                className="min-w-[100px]"
                                type="primary"
                                danger
                                onClick={() => setIsApproveOpen(false)}
                            >
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* Nội dung yêu cầu bổ sung */}
                <Modal
                    title="Nội dung yêu cầu bổ sung"
                    centered
                    open={isAdditionalRequestOpen}
                    onCancel={() => {
                        setIsAdditionalRequestOpen(false);
                        form.resetFields();
                    }}
                    footer={false}
                >
                    <Form
                        onFinish={onFinishAdditional}
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item
                            name="additionalRequest"
                            label="Nội dung yêu cầu bổ sung:"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập nội dung!",
                                },
                            ]}
                        >
                            <TextArea
                                required
                                autoSize={{
                                    minRows: 3,
                                }}
                                maxLength={240}
                                showCount
                            />
                        </Form.Item>
                        <Form.Item className="text-center">
                            <Button
                                className="min-w-[100px] mr-2"
                                type="primary"
                                htmlType="submit"
                            >
                                Xác nhận
                            </Button>{" "}
                            <Button
                                className="min-w-[100px]"
                                type="primary"
                                danger
                                onClick={() => {
                                    setIsAdditionalRequestOpen(false);
                                    form.resetFields();
                                }}
                            >
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* Nội dung từ chối */}
                <Modal
                    title="Nội dung từ chối"
                    centered
                    open={isRejectOpen}
                    onCancel={() => {
                        setIsRejectOpen(false);
                        form2.resetFields();
                    }}
                    footer={false}
                >
                    <Form
                        layout="vertical"
                        onFinish={onFinishReject}
                        initialValues={{
                            remember: true,
                            rejectionDate: format(new Date(), "yyyy-MM-dd"),
                        }}
                        form={form2}
                    >
                        <Form.Item
                            name="rejectionDate"
                            label="Ngày từ chối"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ngày!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Chọn ngày"
                                style={{ width: "470px" }}
                                type="date"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Lí do"
                            name="reasonForRejection"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập nội dung!",
                                },
                            ]}
                        >
                            <TextArea
                                className="mt-1"
                                placeholder="Nhập nội dung ..."
                                autoSize={{
                                    minRows: 3,
                                }}
                                maxLength={240}
                                showCount
                            />
                        </Form.Item>
                        <Form.Item className="text-center mt-8">
                            <Button
                                className="min-w-[100px] mr-2"
                                key="submit"
                                type="primary"
                                htmlType="submit"
                            >
                                Xác nhận
                            </Button>
                            <Button
                                className="min-w-[100px]"
                                key="cancel"
                                type="primary"
                                danger
                                onClick={() => {
                                    setIsRejectOpen(false);
                                    form2.resetFields();
                                }}
                            >
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
}
