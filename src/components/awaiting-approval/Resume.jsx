import React, { useEffect, useState } from "react";
import { searchEmployee } from "../../services/api";
import ResumeModal from "../resume/ResumeModal";
import { useSelector } from "react-redux";
import { Button, Modal, Result, Table, Tabs, Tag } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import useTruncateText from "../../hook/useTruncateText";
import { format } from "date-fns";
import EmployeeProfile from "../modal-employee-profile/EmployeeProfile2";

export default function Resume() {
    const { role } = useSelector((state) => state.account);
    const [profile, setProfile] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listEmployee, setListEmployee] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getAllEmployee = async () => {
        setLoading(true);
        const res = await searchEmployee("2,6");
        if (res?.status === 200) {
            setListEmployee(res?.data?.data);
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllEmployee();
    }, []);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 60,
            render: (_, item, index) => (
                <b className="block text-center">{index + 1}</b>
            ),
        },

        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (dateOfBirth) => (
                <>{format(new Date(dateOfBirth).getTime(), "dd/MM/yyyy")}</>
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
                    {team === 1
                        ? "Back-end"
                        : team === 2
                        ? "Front-end"
                        : "Tester"}
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
                        return <p>{useTruncateText("Nộp lưu hồ sơ", 20)}</p>;
                    case "1":
                        return <p>{useTruncateText("Lưu mới", 20)}</p>;
                    case "2":
                        return <p>{useTruncateText("Chờ xử lí", 20)}</p>;
                    case "3":
                        return (
                            <p>{useTruncateText("Đã được chấp nhận", 20)}</p>
                        );
                    case "4":
                        return <p>{useTruncateText("Yêu cầu bổ sung", 20)}</p>;
                    case "5":
                        return <p>{useTruncateText("Từ chối", 20)}</p>;
                    case "6":
                        return (
                            <p>
                                {useTruncateText("Yêu cầu kết thúc hồ sơ", 20)}
                            </p>
                        );
                    case "7":
                        return (
                            <p>
                                {useTruncateText(
                                    "Chấp nhận yêu cầu kết thúc hồ sơ",
                                    20
                                )}
                            </p>
                        );
                    case "8":
                        return (
                            <p>
                                {useTruncateText(
                                    "Yêu cầu bổ sung vào đơn kết thúc hồ sơ",
                                    20
                                )}
                            </p>
                        );
                    case "9":
                        return (
                            <p>
                                {useTruncateText(
                                    "Từ chối yêu cầu kết thúc hồ sơ",
                                    20
                                )}
                            </p>
                        );
                    default:
                        break;
                }
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
                                }}
                            >
                                <EditOutlined className="text-blue-600 text-lg" />
                            </span>
                        </>
                    ) : (
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                setProfile(user);
                                setIsModalOpen(true);
                            }}
                        >
                            <EyeOutlined className="text-green-600 text-lg" />
                        </span>
                    )}
                </div>
            ),
        },
    ];
    return (
        <>
            <div>
                {role === 5 ? (
                    <>
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={listEmployee}
                            pagination={{
                                pageSize: 10,
                            }}
                            scroll={{
                                y: 490,
                            }}
                        />
                        <Modal
                            title="HỒ SƠ NHÂN VIÊN"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1300}
                            centered
                            footer={
                                <div className="text-center flex justify-center">
                                    <ResumeModal
                                        profile={profile}
                                        type="Resume"
                                        getAllEmployee={getAllEmployee}
                                    />
                                    <Button
                                        className="ml-2"
                                        type="primary"
                                        danger
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            }
                        >
                            <EmployeeProfile employeeId={profile.id} />
                        </Modal>
                    </>
                ) : (
                    <Result
                        icon={<SmileOutlined />}
                        title="Yêu cầu tài khoản manager để truy cập."
                    />
                )}
            </div>
        </>
    );
}
