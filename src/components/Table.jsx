import React, { useState } from "react";
import { Button, Modal, Table, Tag } from "antd";
import useTruncateText from "../hook/useTruncateText";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { deleteEmployee } from "../services/api";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../redux/employee/employeeSlice";
import { STATUS } from "../constants/constants";
const TableComponet = (props) => {
    const [reasonForRejection, setReasonForRejection] = useState("");
    const [openReject, setOpenReject] = useState(false);
    const dispatch = useDispatch();
    const { open, listEmployee } = useSelector((state) => state.employee);
    const { loading, setEmployeeId } = props;
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
            width: 200,
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
                <Tag
                    color={team === 1 ? "green" : "geekblue"}
                    className="w-full text-center"
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
            sorter: true,
            render: (address) => {
                const addressText = useTruncateText(address, 20);
                return (
                    <span className="cursor-default" title={address}>
                        {addressText}
                    </span>
                );
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
                return (
                    <span className="cursor-default" title={status}>
                        {statusText}
                    </span>
                );
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
                    {["1", "5", "4"].includes(employee.submitProfileStatus) && (
                        <span
                            onClick={() => {
                                // setOpen({...open,modalInput:true});
                                dispatch(
                                    setOpen({ ...open, modalInput: true })
                                );
                                setEmployeeId(employee.id);
                            }}
                            className="cursor-pointer"
                        >
                            <EditOutlined className="text-blue-600 text-lg" />
                        </span>
                    )}
                    {["9", "8", "5", "4"].includes(
                        employee.submitProfileStatus
                    ) && (
                        <InfoCircleOutlined
                            onClick={() => {
                                setReasonForRejection(employee);
                                setOpenReject(true);
                            }}
                            className="text-orange-500"
                        />
                    )}
                    {["2", "0", "8", "6", "7", "3", "9"].includes(
                        employee.submitProfileStatus
                    ) && (
                        <EyeOutlined
                            className="text-green-600 text-lg"
                            onClick={() => {
                                setEmployeeId(employee.id);
                                if (employee.submitProfileStatus === "3") {
                                    dispatch(
                                        setOpen({
                                            ...open,
                                            modalUpdateHappening: true,
                                        })
                                    );
                                } else {
                                    dispatch(
                                        setOpen({ ...open, modalProfile: true })
                                    );
                                }
                            }}
                        />
                    )}
                </div>
            ),
        },
    ];
    const handleDeleteEmployee = async (id) => {
        const res = await deleteEmployee(id);
        if (res?.data?.code === STATUS.SUCCESS) {
            dispatch(getAllEmployee("1,2,4,5"));
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
            <Modal
                centered
                title={
                    reasonForRejection?.submitProfileStatus === "8"
                        ? "YÊU CẦU BỔ SUNG VÀO ĐƠN KẾT THÚC"
                        : "LÝ DO TỪ CHỐI YÊU CẦU KẾT THÚC HỒ SƠ"
                }
                onCancel={() => {
                    setOpenReject(false);
                }}
                open={openReject}
                footer={
                    <div className="w-full text-center">
                        <Button
                            type="primary"
                            danger
                            onClick={() => setOpenReject(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                {reasonForRejection?.submitProfileStatus === "8"
                    ? reasonForRejection?.additionalRequestTermination
                    : reasonForRejection?.reasonForRejection}
            </Modal>
        </>
    );
};

export default TableComponet;
