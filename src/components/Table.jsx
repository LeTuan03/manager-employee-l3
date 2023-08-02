import React, { useState } from "react";
import { Modal, Table, Tag } from "antd";
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
    const { role } = useSelector((state) => state.account);
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
            width: 60,
            align: "center",
            render: (_, item, index) => <b>{index + 1}</b>,
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            width: 200,
            render: (name) => useTruncateText(name, 22),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            width: 120,
            align: "center",
            render: (dateOfBirth) => (
                <p className="text-center">
                    {format(new Date(dateOfBirth), "dd/MM/yyyy")}
                </p>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            align: "center",
            width: 90,
            render: (gender) => (
                <p className="text-center">{gender === 1 ? "Nữ" : "Nam"} </p>
            ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: "center",
            width: 130,
            render: (phone) => <p className="text-center">{phone} </p>,
        },
        {
            title: "Nhóm",
            dataIndex: "team",
            key: "team",
            align: "center",
            width: 90,
            render: (team) => (
                <div className="text-center">
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
                </div>
            ),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",

            render: (address) => {
                const addressText = useTruncateText(address, 30);
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
            dataIndex: "submitProfileStatus",
            width: 200,
            align: "center",
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
            width: 100,
            align: "center",
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
                        <span>
                            <InfoCircleOutlined
                                onClick={() => {
                                    setReasonForRejection(
                                        employee?.reasonForRejection
                                    );
                                    setOpenReject(true);
                                }}
                                className="text-orange-500"
                            />
                        </span>
                    )}
                    {["2", "0", "8", "6", "7", "3", "9"].includes(
                        employee.submitProfileStatus
                    ) && (
                        <EyeOutlined
                            className="text-green-600 text-lg"
                            onClick={() => {
                                setEmployeeId(employee.id);
                                if (employee.submitProfileStatus === "3") {
                                    {
                                        role === 5
                                            ? dispatch(
                                                  setOpen({
                                                      ...open,
                                                      modalProfile: true,
                                                  })
                                              )
                                            : dispatch(
                                                  setOpen({
                                                      ...open,
                                                      modalUpdateHappening: true,
                                                  })
                                              );
                                    }
                                } else if (
                                    employee.submitProfileStatus === "7"
                                ) {
                                    dispatch(
                                        setOpen({
                                            ...open,
                                            modalProfile: true,
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
            <div className="main-table">
                <Table
                    bordered
                    columns={columns}
                    dataSource={listEmployee}
                    loading={loading}
                    pagination={{
                        pageSizeOptions: ["1", "10", "20", "30"],
                    }}
                />
            </div>
            <Modal
                centered
                footer={<></>}
                title="LÍ DO TỪ CHỐI"
                onCancel={() => {
                    setOpenReject(false);
                }}
                open={openReject}
            >
                {reasonForRejection}
            </Modal>
        </>
    );
};

export default TableComponet;
