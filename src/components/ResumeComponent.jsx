import React, { useState } from "react";
import {
    Button,
    Checkbox,
    Table,
    Tag,
    Modal,
    Space,
    message,
    DatePicker,
} from "antd";
import useTruncateText from "../hook/useTruncateText";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
    acceptEmployee,
    deleteEmployee,
    getCertificateByEmployee,
    getEmployeeById,
} from "../services/api";
import { format } from "date-fns";
import EmployeeProfile from "./EmployeeProfile";
import TextArea from "antd/es/input/TextArea";

const ResumeComponent = (props) => {
    const {
        listEmployee,
        loading,
        getAllEmployee,
        type,
        setEmployeeId,
        setOpen,
    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [isAdditionalRequestOpen, setIsAdditionalRequestOpen] =
        useState(false);
    const [profile, setProfile] = useState({});
    const [certificate, setCertificate] = useState([]);
    const [resume, setResume] = useState({});
    const [value, setValue] = useState("");

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

    const handleApproveOk = () => {
        setIsModalOpen(false);
    };
    const handleApproveCancel = () => {
        setIsApproveOpen(false);
    };
    const handleAdditionalRequestOk = () => {
        setIsAdditionalRequestOpen(true);
    };
    const handleAdditionalRequestCancel = () => {
        setIsAdditionalRequestOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsApproveOpen(false);
    };
    const handleRejectOk = () => {
        setIsRejectOpen(false);
    };
    const handleRejectCancel = () => {
        setIsRejectOpen(false);
    };

    const handleGetCerByEmp = async (id) => {
        const res = await getCertificateByEmployee(id);
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
            sorter: true,
            width: 300,
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            sorter: true,
            render: (dateOfBirth) => (
                <>{format(new Date(dateOfBirth), "dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            sorter: true,
            render: (gender) => <>{gender === 1 ? "Nữ" : "Nam"}</>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            sorter: true,
        },
        {
            title: "Team",
            dataIndex: "team",
            key: "team",
            sorter: true,
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
            sorter: true,
            render: (address) => {
                const addressText = useTruncateText(address, 20);
                return <span>{addressText}</span>;
            },
        },
        {
            title: "Trạng thái",
            key: "submitProfileStatus",
            sorter: true,
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
                    case "6":
                        status = "Yêu cầu kết thúc hồ sơ";
                    case "7":
                        status = "Yêu cầu kết thúc đã được chấp nhận";
                        break;
                    case "8":
                        status = "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
                        break;
                    case "9":
                        status = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        break;
                }
                const statusText = useTruncateText(status, 20);
                return <>{statusText}</>;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, user) => (
                <div className="flex justify-center gap-3">
                    {user.submitProfileStatus === "1" &&
                    localStorage.getItem("role") === "5" ? (
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
    const handleAccept = async () => {
        //Duyệt nhân viên
        try {
            profile.submitProfileStatus = "3";
            const res = await acceptEmployee(profile);
            setIsApproveOpen(false);
            info(res?.data?.message);
        } catch (error) {
            console.log(error);
        }
    };
    const additionalRequestTermination = async () => {
        //Thêm nội dung yêu cầu bổ sung
        try {
            profile.submitProfileStatus = "4";
            const res = await acceptEmployee(profile);
            setIsAdditionalRequestOpen(false);
            info(res?.data?.message);
        } catch (error) {
            console.log(error);
        }
    };
    const handleRejectProfile = async () => {
        //reject profile
        try {
            profile.reasonForRejection = value;
            profile.submitProfileStatus = "5";
            const res = await acceptEmployee(profile);
            setIsRejectOpen(false);
            info(res?.data?.message);
        } catch (error) {
            console.log(error);
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
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    type === "awaiting-approval" ? (
                        <div className="flex justify-center">
                            {localStorage.getItem("role") === "5" ? (
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
            <Modal
                title="Phê duyệt nhân viên"
                centered
                open={isApproveOpen}
                onOk={handleApproveOk}
                onCancel={handleApproveCancel}
                footer={
                    type === "awaiting-approval" ? (
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
                    ) : (
                        " "
                    )
                }
            >
                Ngày hẹn:
                <Space direction="vertical" size={12} className="mt-1 mb-4">
                    <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                        onChange={(e) =>
                            (profile.terminationAppointmentDate = format(
                                e.$d,
                                "yyyy-MM-dd"
                            ))
                        }
                    />
                </Space>
                <Checkbox>Đã đủ điều kiện phê duyệt</Checkbox>
            </Modal>
            {/* Nội dung yêu cầu bổ sung */}
            <Modal
                title="Nội dung yêu cầu bổ sung"
                centered
                open={isAdditionalRequestOpen}
                onOk={handleAdditionalRequestOk}
                onCancel={handleAdditionalRequestCancel}
                footer={
                    type === "awaiting-approval" ? (
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
                                    additionalRequestTermination();
                                }}
                            >
                                Xác nhận
                            </Button>
                        </>
                    ) : (
                        " "
                    )
                }
            >
                <TextArea
                    onChange={(e) =>
                        (profile.additionalRequest = e.target.value)
                    }
                    placeholder="Nhập nội dung"
                    autoSize={{
                        minRows: 3,
                    }}
                />
            </Modal>
            {/* Nội dung từ chối */}
            <Modal
                title="Nội dung từ chối"
                centered
                open={isRejectOpen}
                onOk={handleRejectOk}
                onCancel={handleRejectCancel}
                footer={
                    type === "awaiting-approval" ? (
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
                                onClick={() => handleRejectProfile()}
                            >
                                Xác nhận
                            </Button>
                        </>
                    ) : (
                        " "
                    )
                }
            >
                Ngày từ chối *
                <Space direction="vertical" size={12} className="mt-1 mb-4">
                    <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                        onChange={(e) =>
                            (profile.rejectionDate = new Date(
                                e.target.value
                            ).getTime())
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
            {contextHolder}
        </>
    );
};

export default ResumeComponent;
