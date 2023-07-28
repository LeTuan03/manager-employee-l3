import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Modal, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import {
    acceptPromote,
    getCertificateByEmployee,
    getEmployeeById,
    proposalEdit,
    salaryApprove,
} from "../services/api";
import EmployeeProfile from "./EmployeeProfile";

export default function ResumeModal(props) {
    const { profile, type } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [isAdditionalRequestOpen, setIsAdditionalRequestOpen] =
        useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [acceptDate, setAcceptDate] = useState("");
    const [rejectDate, setRejectDate] = useState("");
    const [additional, setAdditional] = useState("");
    const [certificate, setCertificate] = useState([]);
    const [resume, setResume] = useState({});
    const [value, setValue] = useState("");

    const handleWatchResume = async (id) => {
        const res = await getCertificateByEmployee(id);
        setCertificate(res?.data?.data);
        const res2 = await getEmployeeById(id);
        setResume(res2?.data?.data);
    };

    // Phê duyệt
    const handleAccept = async () => {
        try {
            profile.acceptanceDate = acceptDate;
            if (type === "Propose") {
                profile.proposalStatus = "3";
                const res = await proposalEdit(profile);
                message.success("Phê duyệt nhân viên thành công!");
                setIsApproveOpen(false);
            } else if (type === "Promote") {
                profile.processStatus = "3";
                const res = await acceptPromote(profile);
                message.success("Phê duyệt nhân viên thành công!");
                setIsApproveOpen(false);
            } else if (type === "IncreaseSalary") {
                profile.salaryIncreaseStatus = "3";
                const res = await salaryApprove(profile);
                message.success("Phê duyệt nhân viên thành công!");
                setIsApproveOpen(false);
            }
        } catch (error) {
            message.error("Phê duyệt nhân viên thất bại!");
        }
    };
    // yêu cầu bổ sung
    const handleAdditionalRequest = async () => {
        try {
            profile.additionalRequest = additional;
            if (type === "Propose") {
                profile.proposalStatus = "4";
                const res = await proposalEdit(profile);
                message.success("Yêu cầu bổ sung nhân viên thành công!");
                setIsAdditionalRequestOpen(false);
            } else if (type === "Promote") {
                profile.processStatus = "4";
                const res = await acceptPromote(profile);
                message.success("Yêu cầu bổ sung nhân viên thành công!");
                setIsAdditionalRequestOpen(false);
            } else if (type === "IncreaseSalary") {
                profile.salaryIncreaseStatus = "4";
                const res = await salaryApprove(profile);
                message.success("Yêu cầu bổ sung nhân viên thành công!");
                setIsAdditionalRequestOpen(false);
            }
        } catch (error) {
            message.error("Yêu cầu bổ sung nhân viên thất bại!");
        }
    };
    // yêu cầu từ chối
    const handleReject = async () => {
        try {
            profile.rejectionDate = rejectDate;
            profile.reasonForRefusal = value;
            if (type === "Propose") {
                profile.proposalStatus = "5";
                const res = await proposalEdit(profile);
                message.success("Yêu cầu từ chối nhân viên thành công!");
                setIsRejectOpen(false);
            } else if (type === "Promote") {
                profile.processStatus = "5";
                const res = rejectPromote(profile);
                message.success("Yêu cầu từ chối nhân viên thành công!");
                setIsRejectOpen(false);
            } else if (type === "IncreaseSalary") {
                profile.salaryIncreaseStatus = "5";
                const res = await salaryApprove(profile);
                message.success("Yêu cầu từ chối nhân viên thành công!");
                setIsRejectOpen(false);
            }
        } catch (error) {
            message.error("Yêu cầu từ chối nhân viên thất bại!");
        }
    };
    return (
        <>
            <Button
                className="bg-green-700 text-white"
                onClick={() => setIsModalOpen(true)}
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
                key="submit"
                type="primary"
                onClick={() => setIsAdditionalRequestOpen(true)}
            >
                Yêu cầu bổ sung
            </Button>
            <Button type="primary" danger onClick={() => setIsRejectOpen(true)}>
                Từ chối
            </Button>
            <div>
                {/* modal */}
                {/* Hồ sơ nhân viên  */}
                <Modal
                    width={1300}
                    title="Hồ sơ nhân viên"
                    centered
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={
                        <Button
                            type="primary"
                            danger
                            onClick={() =>
                                handleWatchResume(profile.employeeId)
                            }
                        >
                            Hủy
                        </Button>
                    }
                >
                    <EmployeeProfile
                        profile={profile}
                        certificate={certificate}
                        resume={resume}
                    />
                </Modal>

                {/* Phê duyệt nhân viên */}
                <Modal
                    title="Phê duyệt nhân viên"
                    centered
                    open={isApproveOpen}
                    onCancel={() => setIsApproveOpen(false)}
                    footer={
                        <>
                            <Button
                                key="cancel"
                                type="primary"
                                danger
                                onClick={() => setIsApproveOpen(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                key="submit"
                                type="primary"
                                onClick={() => handleAccept()}
                            >
                                Xác nhận
                            </Button>
                        </>
                    }
                >
                    Ngày hẹn:
                    <Space direction="vertical" size={12} className="mt-1 mb-4">
                        <DatePicker
                            placeholder="Chọn ngày"
                            style={{ width: "470px" }}
                            onChange={(e) => {
                                setAcceptDate(format(e.$d, "yyyy-MM-dd"));
                            }}
                        />
                    </Space>
                    <Checkbox checked>Đã đủ điều kiện phê duyệt</Checkbox>
                </Modal>
                {/* Nội dung yêu cầu bổ sung */}
                <Modal
                    title="Nội dung yêu cầu bổ sung"
                    centered
                    open={isAdditionalRequestOpen}
                    onCancel={() => setIsAdditionalRequestOpen(false)}
                    footer={
                        <>
                            <Button
                                key="cancel"
                                type="primary"
                                danger
                                onClick={() =>
                                    setIsAdditionalRequestOpen(false)
                                }
                            >
                                Hủy
                            </Button>
                            <Button
                                key="submit"
                                type="primary"
                                onClick={() => {
                                    handleAdditionalRequest();
                                }}
                            >
                                Xác nhận
                            </Button>
                        </>
                    }
                >
                    <TextArea
                        required
                        placeholder="Nhập nội dung"
                        autoSize={{
                            minRows: 3,
                        }}
                        onChange={(e) => setAdditional(e.target.value)}
                    />
                </Modal>
                {/* Nội dung từ chối */}
                <Modal
                    title="Nội dung từ chối"
                    centered
                    open={isRejectOpen}
                    onCancel={() => setIsRejectOpen(false)}
                    footer={
                        <>
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
                                onClick={() => handleReject()}
                            >
                                Xác nhận
                            </Button>
                        </>
                    }
                >
                    Ngày từ chối *
                    <Space direction="vertical" size={12} className="mt-1 mb-4">
                        <DatePicker
                            placeholder="Chọn ngày"
                            style={{ width: "470px" }}
                            onChange={(e) =>
                                setRejectDate(format(e.$d, "yyyy/MM/dd"))
                            }
                        />
                    </Space>
                    Lí do:
                    <TextArea
                        className="mt-1"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Nhập nội dung ..."
                        autoSize={{
                            minRows: 3,
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}
