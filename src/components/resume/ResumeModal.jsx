import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import {
    acceptEmployee,
    acceptPromote,
    proposalEdit,
    salaryApprove,
} from "../../services/api";
import EmployeeProfile from "../modal-employee-profile/EmployeeProfile";

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

    // Phê duyệt
    const onFinish = async (values) => {
        try {
            profile.acceptanceDate = format(
                new Date(values.acceptDay?.$d).getTime(),
                "yyyy-MM-dd"
            );
            if (type === "Propose") {
                profile.proposalStatus = "3";
                const res = await proposalEdit(profile);
                message.success("Phê duyệt nhân viên thành công!");
                await handleGetProposal();
                setIsApproveOpen(false);
            } else if (type === "Promote") {
                profile.processStatus = "3";
                const res = await acceptPromote(profile);
                message.success("Phê duyệt nhân viên thành công!");
                await handleGetProcess();
                setIsApproveOpen(false);
            } else if (type === "IncreaseSalary") {
                profile.salaryIncreaseStatus = "3";
                const res = await salaryApprove(profile);
                message.success("Phê duyệt nhân viên thành công!");
                await getCurrentEmpIncreaseSalary();
                setIsApproveOpen(false);
            } else if (type === "Resume") {
                profile.submitProfileStatus = "3";
                profile.terminationAppointmentDate = format(
                    new Date(values.acceptDay.$d).getTime(),
                    "yyyy-MM-dd"
                );
                const res = await acceptEmployee(profile);
                message.success("Phê duyệt nhân viên thành công!");
                await getAllEmployee();
                setIsApproveOpen(false);
            }
        } catch (error) {
            console.log(error);
            message.error("Phê duyệt nhân viên thất bại!");
        }
    };
    // yêu cầu bổ sung
    const onFinishAdditional = async (values) => {
        try {
            profile.additionalRequest = values.additionalRequest;
            if (type === "Propose") {
                profile.proposalStatus = "4";
                const res = await proposalEdit(profile);
                message.success("Yêu cầu bổ sung nhân viên thành công!");
                await handleGetProposal();
                setIsAdditionalRequestOpen(false);
            } else if (type === "Promote") {
                profile.processStatus = "4";
                const res = await acceptPromote(profile);
                message.success("Yêu cầu bổ sung nhân viên thành công!");
                await handleGetProcess();
                setIsAdditionalRequestOpen(false);
            } else if (type === "IncreaseSalary") {
                profile.salaryIncreaseStatus = "4";
                const res = await salaryApprove(profile);
                message.success("Yêu cầu bổ sung nhân viên thành công!");
                await getCurrentEmpIncreaseSalary();
                setIsAdditionalRequestOpen(false);
            } else if (type === "Resume") {
                profile.additionalRequest = values.additionalRequest;
                profile.submitProfileStatus = "4";
                const res = await acceptEmployee(profile);
                message.success("Yêu cầu bổ sung nhân viên thành công!");
                await getAllEmployee();
                setIsAdditionalRequestOpen(false);
            }
        } catch (error) {
            message.error("Yêu cầu bổ sung nhân viên thất bại!");
        }
        await getAllEmployee();
    };
    // yêu cầu từ chối
    const onFinishReject = async (values) => {
        try {
            profile.rejectionDate = format(
                new Date(values.rejectionDate.$d).getTime(),
                "yyyy-MM-dd"
            );
            profile.reasonForRefusal = values.reasonForRefusal;
            if (type === "Propose") {
                profile.proposalStatus = "5";
                const res = await proposalEdit(profile);
                message.success("Từ chối nhân viên thành công!");
                await handleGetProposal();
                setIsRejectOpen(false);
            } else if (type === "Promote") {
                profile.processStatus = "5";
                const res = rejectPromote(profile);
                message.success("Từ chối nhân viên thành công!");
                await handleGetProcess();
                setIsRejectOpen(false);
            } else if (type === "IncreaseSalary") {
                profile.salaryIncreaseStatus = "5";
                const res = await salaryApprove(profile);
                message.success("Từ chối nhân viên thành công!");
                await getCurrentEmpIncreaseSalary();
                setIsRejectOpen(false);
            } else if (type === "Resume") {
                profile.reasonForRejection = values.reasonForRejection;
                profile.rejectionDate = format(
                    new Date(values.rejectionDate.$d).getTime(),
                    "yyyy-MM-dd"
                );
                profile.salaryIncreaseStatus = "5";
                const res = await acceptEmployee(profile);
                message.success("Từ chối nhân viên thành công!");
                await getAllEmployee();
            }
        } catch (error) {
            message.error("Từ chối nhân viên thất bại!");
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
                    <EmployeeProfile setThreeInfo={profile} />
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
                            name="reasonForRefusal"
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
