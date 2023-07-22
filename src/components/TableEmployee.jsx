import React, { useState } from "react";
import { Button, Modal, Table, Tag } from "antd";
import useTruncateText from "../hook/useTruncateText";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
    deleteEmployee,
    getCertificateByEmployee,
    getEmployeeById,
} from "../services/api";
import { format } from "date-fns";
import EmployeeProfile from "./EmployeeProfile";

const TableComponetEmp = (props) => {
    const { listEmployee, loading, getAllEmployee, setOpen, setEmployeeId } =
        props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [profile, setProfile] = useState({});
    const [certificate, setCertificate] = useState([]);
    const [resume, setResume] = useState({});

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
                    case "7":
                        status = "Yêu cầu kết thúc";
                        break;
                    case "8":
                        status = "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
                        break;
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
            render: (_, employee) => (
                <div className="flex justify-center gap-3">
                    {employee.submitProfileStatus === "1" ? (
                        <>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    handleDeleteEmployee(employee.id);
                                }}
                            >
                                <DeleteOutlined className="text-red-600 text-lg" />
                            </span>
                            <span
                                onClick={() => {
                                    setOpen(true);
                                    setEmployeeId(employee.id);
                                }}
                                className="cursor-pointer"
                            >
                                <EditOutlined className="text-blue-600 text-lg" />
                            </span>
                        </>
                    ) : (
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                handleGetCerByEmp(employee.id);
                                handeGetResume(employee.id);
                                showModal(employee);
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
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleGetCerByEmp = async (id) => {
        const res = await getCertificateByEmployee(id);
        setCertificate(res?.data?.data);
    };

    const handeGetResume = async (id) => {
        const res = await getEmployeeById(id);
        setResume(res?.data?.data);
    };

    const showModal = (user) => {
        setProfile(user);
        setIsModalOpen(true);
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
            <Modal
                width={1300}
                title="Hồ sơ nhân viên"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    <div className="flex justify-center">
                        <Button type="primary" danger onClick={handleCancel}>
                            Hủy
                        </Button>
                    </div>
                }
            >
                <EmployeeProfile
                    profile={profile}
                    certificate={certificate}
                    resume={resume}
                />
            </Modal>
        </>
    );
};

export default TableComponetEmp;
