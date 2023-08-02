import React, { useState } from "react";
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
import EmployeeProfile from "../modal-employee-profile/EmployeeProfile2";

export default function ResumeModal(props) {
    const {
        profile,
        type,
        setIsOpen,
        getAllEmployee,
        getCurrentEmpIncreaseSalary,
        handleGetProcess,
        handleGetProposal,
    } = props;
    const [open, setOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(false);
    const [isAdditionalRequestOpen, setIsAdditionalRequestOpen] =
        useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);

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
                await getAllEmployee();
                break;
            default:
                break;
        }
    };

    const handleActionFailure = (error) => {
        console.error(error);
    };

    const onFinish = async (values) => {
        try {
            switch (type) {
                case "Propose":
                    profile.acceptanceDate = values.acceptDay;
                    profile.proposalStatus = "3";
                    await proposalEdit(profile);
                    setIsApproveOpen(false);
                    setIsOpen(false);
                    await handleActionSuccess(type);
                    break;
                case "Promote":
                    profile.acceptanceDate = values.acceptDay;
                    profile.processStatus = "3";
                    await acceptPromote(profile);
                    setIsApproveOpen(false);
                    setIsOpen(false);
                    await handleActionSuccess(type);
                    break;
                case "IncreaseSalary":
                    profile.acceptanceDate = values.acceptDay;
                    profile.salaryIncreaseStatus = "3";
                    await salaryApprove(profile);
                    setIsApproveOpen(false);
                    setIsOpen(false);
                    await handleActionSuccess(type);
                    break;
                case "Resume":
                    profile.submitProfileStatus = "3";
                    profile.terminationAppointmentDate = values.acceptDay;
                    await acceptEmployee(profile);
                    setIsApproveOpen(false);
                    setIsOpen(false);
                    await handleActionSuccess(type);
                    break;
                default:
                    break;
            }
            form3.resetFields();
        } catch (error) {
            handleActionFailure(error);
        }
    };

    const onFinishAdditional = async (values) => {
        try {
            profile.additionalRequest = values.additionalRequest;
            switch (type) {
                case "Propose":
                    profile.proposalStatus = "4";
                    await proposalEdit(profile);
                    await handleActionSuccess(type);
                    setIsAdditionalRequestOpen(false);
                    setIsOpen(false);
                    break;
                case "Promote":
                    profile.processStatus = "4";
                    await acceptPromote(profile);
                    await handleActionSuccess(type);
                    setIsAdditionalRequestOpen(false);
                    setIsOpen(false);
                    break;
                case "IncreaseSalary":
                    profile.salaryIncreaseStatus = "4";
                    await salaryApprove(profile);
                    await handleActionSuccess(type);
                    setIsAdditionalRequestOpen(false);
                    setIsOpen(false);
                    break;
                case "Resume":
                    profile.submitProfileStatus = "4";
                    await acceptEmployee(profile);
                    await handleActionSuccess(type);
                    setIsAdditionalRequestOpen(false);
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
            form.resetFields();
        } catch (error) {
            handleActionFailure(error);
        }
    };

    const onFinishReject = async (values) => {
        try {
            profile.rejectionDate = values.rejectionDate;
            profile.reasonForRefusal = values.reasonForRejection;
            switch (type) {
                case "Propose":
                    profile.proposalStatus = "5";
                    await proposalEdit(profile);
                    await handleActionSuccess(type);
                    setIsRejectOpen(false);
                    setIsOpen(false);
                    break;
                case "Promote":
                    profile.processStatus = "5";
                    await rejectPromote(profile);
                    await handleActionSuccess(type);
                    setIsRejectOpen(false);
                    setIsOpen(false);
                    break;
                case "IncreaseSalary":
                    profile.salaryIncreaseStatus = "5";
                    await salaryApprove(profile);
                    await handleActionSuccess(type);
                    setIsRejectOpen(false);
                    setIsOpen(false);
                    break;
                case "Resume":
                    profile.submitProfileStatus = "5";
                    await acceptEmployee(profile);
                    await handleActionSuccess(type);
                    setIsRejectOpen(false);
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
            form2.resetFields();
            setIsRejectOpen(false);
            setIsOpen(false);
        } catch (error) {
            handleActionFailure(error);
        }
    };
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    return (
        <>
            <Button
                className="bg-green-700 text-white"
                onClick={() => {
                    setEmployeeId(
                        type === "Resume" ? profile?.id : profile?.employeeId
                    );
                    setOpen(true);
                }}
            >
                Xem hồ sơ
            </Button>

            <Button
                className="bg-green-700 text-white"
                onClick={() => setIsApproveOpen(true)}
            >
                Phê duyệt
            </Button>
            <Button
                type="primary"
                onClick={() => setIsAdditionalRequestOpen(true)}
            >
                Yêu cầu bổ sung
            </Button>
            <Button type="primary" danger onClick={() => setIsRejectOpen(true)}>
                Từ chối
            </Button>
            <div>
                {/* Hồ sơ nhân viên  */}
                <Modal
                    width={1300}
                    title="Hồ sơ nhân viên"
                    centered
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={
                        <div className="text-center">
                            <Button
                                type="primary"
                                danger
                                onClick={() => setOpen(false)}
                            >
                                Hủy
                            </Button>
                        </div>
                    }
                >
                    <EmployeeProfile employeeId={employeeId} />
                </Modal>
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
                                key="cancel"
                                type="primary"
                                danger
                                onClick={() => setIsApproveOpen(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="ml-2"
                                key="submit"
                                type="primary"
                                htmlType="submit"
                            >
                                Xác nhận
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
                            label="Nội dung yêu cầu"
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
                            />
                        </Form.Item>
                        <Form.Item className="text-center">
                            <Button
                                type="primary"
                                danger
                                onClick={() => {
                                    setIsAdditionalRequestOpen(false);
                                    form.resetFields();
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="ml-2"
                            >
                                Xác nhận
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
                            />
                        </Form.Item>
                        <Form.Item className="text-center mt-8">
                            <Button
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
                            <Button
                                key="submit"
                                type="primary"
                                htmlType="submit"
                                className="ml-2"
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
}
