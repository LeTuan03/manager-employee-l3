import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Modal, message } from "antd";
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
        getAllEmployee,
        getCurrentEmpIncreaseSalary,
        handleGetProcess,
        handleGetProposal,
    } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(false);
    const [isAdditionalRequestOpen, setIsAdditionalRequestOpen] =
        useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);

    const handleActionSuccess = (type) => {
        message.success("Action completed successfully!");
        switch (type) {
            case "Propose":
                handleGetProposal();
                break;
            case "Promote":
                handleGetProcess();
                break;
            case "IncreaseSalary":
                getCurrentEmpIncreaseSalary();
                break;
            case "Resume":
                getAllEmployee();
                break;
            default:
                break;
        }
    };

    const handleActionFailure = (error) => {
        console.error(error);
        // message.error("Action failed!");
    };

    const onFinish = async (values) => {
        try {
            profile.acceptanceDate = format(
                new Date(values.acceptDay?.$d).getTime(),
                "yyyy-MM-dd"
            );
            switch (type) {
                case "Propose":
                    profile.proposalStatus = "3";
                    await proposalEdit(profile);
                    break;
                case "Promote":
                    profile.processStatus = "3";
                    await acceptPromote(profile);
                    break;
                case "IncreaseSalary":
                    profile.salaryIncreaseStatus = "3";
                    await salaryApprove(profile);
                    break;
                case "Resume":
                    profile.submitProfileStatus = "3";
                    profile.terminationAppointmentDate = format(
                        new Date(values.acceptDay.$d).getTime(),
                        "yyyy-MM-dd"
                    );
                    await acceptEmployee(profile);
                    break;
                default:
                    break;
            }
            handleActionSuccess(type);
            setIsApproveOpen(false);
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
                    break;
                case "Promote":
                    profile.processStatus = "4";
                    await acceptPromote(profile);
                    break;
                case "IncreaseSalary":
                    profile.salaryIncreaseStatus = "4";
                    await salaryApprove(profile);
                    break;
                case "Resume":
                    profile.additionalRequest = values.additionalRequest;
                    profile.submitProfileStatus = "4";
                    await acceptEmployee(profile);
                    break;
                default:
                    break;
            }
            handleActionSuccess(type);
            setIsAdditionalRequestOpen(false);
        } catch (error) {
            handleActionFailure(error);
        }
        await getAllEmployee();
    };

    const onFinishReject = async (values) => {
        try {
            profile.rejectionDate = format(
                new Date(values.rejectionDate.$d).getTime(),
                "yyyy-MM-dd"
            );
            profile.reasonForRefusal = values.reasonForRejection;
            switch (type) {
                case "Propose":
                    profile.proposalStatus = "5";
                    await proposalEdit(profile);
                    break;
                case "Promote":
                    profile.processStatus = "5";
                    await rejectPromote(profile);
                    break;
                case "IncreaseSalary":
                    profile.salaryIncreaseStatus = "5";
                    await salaryApprove(profile);
                    break;
                case "Resume":
                    profile.submitProfileStatus = "5";
                    await acceptEmployee(profile);
                    break;
                default:
                    break;
            }
            handleActionSuccess(type);
            setIsRejectOpen(false);
        } catch (error) {
            handleActionFailure(error);
        }
    };

    return (
        <>
            <Button
                className="bg-green-700 text-white"
                onClick={() => {
                    setEmployeeId(
                        type === "Resume" ? profile?.id : profile?.employeeId
                    );
                    setIsModalOpen(true);
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
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={
                        <div className="text-center">
                            <Button
                                type="primary"
                                danger
                                onClick={() => setIsModalOpen(false)}
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
                    <Form onFinish={onFinish} layout="vertical">
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
                            <DatePicker
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
                    onCancel={() => setIsAdditionalRequestOpen(false)}
                    footer={false}
                >
                    <Form onFinish={onFinishAdditional} layout="vertical">
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
                                onClick={() =>
                                    setIsAdditionalRequestOpen(false)
                                }
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
                    onCancel={() => setIsRejectOpen(false)}
                    footer={false}
                >
                    <Form layout="vertical" onFinish={onFinishReject}>
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
                            <DatePicker
                                placeholder="Chọn ngày"
                                style={{ width: "470px" }}
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
                                onClick={() => setIsRejectOpen(false)}
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
