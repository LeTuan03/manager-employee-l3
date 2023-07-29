import React, { useState } from "react";
import { Button, Table, Tag, Modal, message } from "antd";
import useTruncateText from "../../hook/useTruncateText";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
    deleteEmployee,
    getCertificateByEmployeeId,
    getEmployeeById,
} from "../../services/api";
import { format } from "date-fns";
import ModalAccept from "../modal-wait-approval/ModalAccept";
import ModalAdditional from "../modal-wait-approval//ModalAdditional";
import ModalReject from "../modal-wait-approval/ModalReject";
import { useSelector } from "react-redux";
import EmployeeProfile from "../modal-employee-profile/EmployeeProfile";

const ResumeComponent = (props) => {
    const {
        listEmployee,
        loading,
        getAllEmployee,
        type,
        setEmployeeId,
        setOpen,
    } = props;

    const { role } = useSelector((state) => state.account);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [isAdditionalRequestOpen, setIsAdditionalRequestOpen] =
        useState(false);
    const [profile, setProfile] = useState({});
    const [certificate, setCertificate] = useState([]);
    const [resume, setResume] = useState({});

    const [messageApi, contextHolder] = message.useMessage();
    const info = (message) => {
        messageApi.success(
            "Cập nhật thông tin nhân viên thành công !!!" || message
        );
    };

    const showModal = (user) => {
        setIsModalOpen(true);
        setProfile(user);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsApproveOpen(false);
    };

    const handleGetCerByEmp = async (id) => {
        const res = await getCertificateByEmployeeId(id);
        setCertificate(res?.data?.data);
    };

    const handeGetResume = async (id) => {
        const res = await getEmployeeById(id);
        setResume(res?.data?.data);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },

        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            width: 250,
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (dateOfBirth) => (
                <>{format(new Date(dateOfBirth), "dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (gender) => <>{gender === 1 ? "Nữ" : "Nam"}</>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Nhóm",
            dataIndex: "team",
            key: "team",
            render: (team) => (
                <Tag color={team === 1 ? "green" : "geekblue"}>
                    {team === 1 ? "Back-end" : "Front-end"}
                </Tag>
            ),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            render: (address) => {
                const addressText = useTruncateText(address, 25);
                return <span>{addressText}</span>;
            },
        },
        {
            title: "Trạng thái",
            key: "submitProfileStatus",
            dataIndex: "submitProfileStatus",
            render: (status) => {
                switch (status) {
                    case "0":
                        status = "Nộp lưu hồ sơ";
                        break;
                    case "1":
                        status = "Lưu mới";
                        break;
                    case "2":
                        status = "Chờ xử lí";
                        break;
                    case "3":
                        status = "Đã được chấp nhận";
                        break;
                    case "4":
                        status = "Yêu cầu bổ sung";
                        break;
                    case "5":
                        status = "Từ chối";
                        break;
                    case "6":
                        status = "Yêu cầu kết thúc hồ sơ";
                        break;
                    case "7":
                        status = "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case "8":
                        status = "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
                        break;
                    case "9":
                        status = "Từ chối yêu cầu kết thúc hồ sơ";
                        break;
                    default:
                        break;
                }
                const statusText = useTruncateText(status, 25);
                return <>{statusText}</>;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, user) => (
                <div className="flex justify-center gap-3">
                    {user.submitProfileStatus === "1" && role === 5 ? (
                        <>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    handleDeleteEmployee(user.id);
                                }}
                            >
                                <DeleteOutlined className="text-red-600 text-lg" />
                            </span>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    setOpen(true);
                                    setEmployeeId(user.id);
                                }}
                            >
                                <EditOutlined className="text-blue-600 text-lg" />
                            </span>
                        </>
                    ) : (
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                showModal(user);
                                handleGetCerByEmp(user.id);
                                handeGetResume(user.id);
                            }}
                        >
                            <EyeOutlined className="text-green-600 text-lg" />
                        </span>
                    )}
                </div>
            ),
        },
    ];

    const handleDeleteEmployee = async (id) => {
        const res = await deleteEmployee(id);
        if (res?.data?.code === 200) {
            await getAllEmployee();
        }
    };

    return (
        <>
            <Table
                bordered
                columns={columns}
                dataSource={listEmployee}
                loading={loading}
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: ["1", "10", "20", "30"],
                }}
            />

            {/* Hồ sơ nhân viên */}
            <Modal
                width={1300}
                title="Hồ sơ nhân viên"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={handleCancel}
                footer={
                    type === "awaiting-approval" ? (
                        <div className="flex justify-center">
                            {role === 5 ? (
                                <>
                                    <Button
                                        className="bg-green-700 text-white"
                                        onClick={() => setIsApproveOpen(true)}
                                    >
                                        Phê duyệt
                                    </Button>
                                    <Button
                                        key="submit"
                                        type="primary"
                                        onClick={() =>
                                            setIsAdditionalRequestOpen(true)
                                        }
                                    >
                                        Yêu cầu bổ sung
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => setIsRejectOpen(true)}
                                    >
                                        Từ chối
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={handleCancel}
                                    >
                                        Hủy
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="primary"
                                    danger
                                    onClick={handleCancel}
                                >
                                    Hủy
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <Button
                                key="cancel"
                                type="primary"
                                danger
                                onClick={handleCancel}
                            >
                                Hủy
                            </Button>
                        </div>
                    )
                }
            >
                <EmployeeProfile
                    profile={profile}
                    certificate={certificate}
                    resume={resume}
                />
            </Modal>
            {/* Phê duyệt nhân viên */}
            <ModalAccept
                isApproveOpen={isApproveOpen}
                setIsApproveOpen={setIsApproveOpen}
                setIsModalOpen={setIsModalOpen}
                profile={profile}
                type={type}
                getAllEmployee={getAllEmployee}
            />
            <ModalAdditional
                isAdditionalRequestOpen={isAdditionalRequestOpen}
                setIsAdditionalRequestOpen={setIsAdditionalRequestOpen}
                profile={profile}
                getAllEmployee={getAllEmployee}
                type={type}
            />
            <ModalReject
                isRejectOpen={isRejectOpen}
                setIsRejectOpen={setIsRejectOpen}
                profile={profile}
                getAllEmployee={getAllEmployee}
                type={type}
            />

            {contextHolder}
        </>
    );
};

export default ResumeComponent;
