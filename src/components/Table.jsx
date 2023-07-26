import React, { useState } from "react";
import { Table, Tag } from "antd";
import useTruncateText from "../hook/useTruncateText";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { deleteEmployee } from "../services/api";
import { format } from "date-fns";
import UpdateHappeningModal from "./UpdateHappeningModal";
import EmployeeProfile from "./EmployeeProfile";
import SaveResume from "./SaveResume";
const TableComponet = (props) => {
    const {
        listEmployee,
        loading,
        getAllEmployee,
        setOpen,
        setEmployeeId,
        setIsModalOpen,
        employeeId,
        setIsResumeOpen,
        isResumeOpen,
        type,
    } = props;
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
            title: "Nhóm",
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
                const statusText = useTruncateText(status, 20);
                return <>{statusText}</>;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, employee) => (
                <div className="flex justify-center gap-2">
                    {employee.submitProfileStatus === "1" && (
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                handleDeleteEmployee(employee.id);
                            }}
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                    )}
                    {["1", "4"].includes(employee.submitProfileStatus) && (
                        <span
                            onClick={() => {
                                setOpen(true);
                                setEmployeeId(employee.id);
                            }}
                            className="cursor-pointer"
                        >
                            <EditOutlined className="text-blue-600 text-lg" />
                        </span>
                    )}
                    {["9", "8", "5", "4"].includes(
                        employee.submitProfileStatus
                    ) && <InfoCircleOutlined className="text-orange-500" />}
                    {["2", "0", "8", "6", "7"].includes(
                        employee.submitProfileStatus
                    ) && (
                        <EyeOutlined
                            className="text-green-600 text-lg"
                            onClick={() => {
                                setIsModalOpen(true);
                                setEmployeeId(employee.id);
                                // setIsResumeOpen(true);
                            }}
                        />
                    )}
                    {employee.submitProfileStatus === "3" && (
                        <UpdateHappeningModal
                            employee={employee}
                        ></UpdateHappeningModal>
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
        </>
    );
};

export default TableComponet;
