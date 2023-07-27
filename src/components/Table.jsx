import React from "react";
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
import { useSelector } from "react-redux";
const TableComponet = (props) => {
    const {
        listEmployee,
        loading,
        getAllEmployee,
        setOpen,
        setEmployeeId,
        setIsModalOpen,
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
            render: (text) => <a> {useTruncateText(text, 25)}</a>,
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
                <Tag
                    className="w-full text-center"
                    color={team === 1 ? "green" : "geekblue"}
                >
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
                            }}
                        />
                    )}
                    {employee.submitProfileStatus === "3" && role === 4 && (
                        <UpdateHappeningModal
                            employee={employee}
                        ></UpdateHappeningModal>
                    )}
                </div>
            ),
        },
    ];
    const { role } = useSelector((state) => state.account);
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
