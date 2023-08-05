import React, { useState } from "react";
import { Button, Modal, Table, Tag } from "antd";
import TextToTruncate from "../hook/TextToTruncate";
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
import {
    GENDER,
    ROLE,
    STATUS,
    STATUS_EMPLOYEE,
    TEAM,
} from "../constants/constants";
import ModalDelete from "./ModalDelete";
import StringStatus from "./common/StringStatus";
const TableComponet = (props) => {
    const [reasonForRejection, setReasonForRejection] = useState("");
    const [openReject, setOpenReject] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
    const dispatch = useDispatch();
    const { open, listEmployee, isLoading } = useSelector(
        (state) => state.employee
    );
    const { role } = useSelector((state) => state.account);
    const { setEmployeeId } = props;
    const {
        SUBMIT_FILE_SAVE,
        NEW_SAVE,
        PENDING,
        BEEN_APPEOVED,
        ADDITIONAL_REQUIREMENTS,
        REJECT,
        PROFILE_END_REQUEST,
        ACCEPT_REQUEST_END_PROFILE,
        ADDITIONAL_REQUIREMENTS_END_PROFILE,
        REJECT_REQUEST_END_PROFILE,
    } = STATUS_EMPLOYEE;

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
            render: (name) => TextToTruncate(name, 22),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            width: 120,
            align: "center",
            render: (dateOfBirth) => (
                <p>{format(new Date(dateOfBirth), "dd/MM/yyyy")}</p>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            align: "center",
            width: 90,
            render: (gender) => (
                <p>{gender === GENDER.FEMALE ? "Nữ" : "Nam"}</p>
            ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: "center",
            width: 130,
            render: (phone) => <p>{phone} </p>,
        },
        {
            title: "Nhóm",
            dataIndex: "team",
            key: "team",
            align: "center",
            width: 90,
            render: (team) => {
                let color, is;
                switch (team) {
                    case TEAM.BE:
                        color = "geekblue";
                        is = "Back-end";
                        break;
                    case TEAM.FE:
                        color = "green";
                        is = "Front-end";
                        break;
                    default:
                        color = "red";
                        is = "Tester";
                        break;
                }
                return (
                    <div>
                        <Tag color={color} className="w-full text-center">
                            {is}
                        </Tag>
                    </div>
                );
            },
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",

            render: (address) => {
                const addressText = TextToTruncate(address || "", 30);
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
                const statusText = TextToTruncate(StringStatus(status), 25);
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
                    {employee.submitProfileStatus === NEW_SAVE && (
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                setEmployeeIdToDelete(employee.id);
                                setOpenDelete(true);
                            }}
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                    )}

                    {[
                        REJECT_REQUEST_END_PROFILE,
                        ADDITIONAL_REQUIREMENTS_END_PROFILE,
                        REJECT,
                        ADDITIONAL_REQUIREMENTS,
                    ].includes(employee.submitProfileStatus) && (
                        <span>
                            <InfoCircleOutlined
                                onClick={() => {
                                    setReasonForRejection(employee);
                                    setOpenReject(true);
                                }}
                                className="text-orange-500 text-base"
                            />
                        </span>
                    )}
                    {[
                        PENDING,
                        SUBMIT_FILE_SAVE,
                        ADDITIONAL_REQUIREMENTS_END_PROFILE,
                        PROFILE_END_REQUEST,
                        ACCEPT_REQUEST_END_PROFILE,
                        BEEN_APPEOVED,
                        REJECT_REQUEST_END_PROFILE,
                    ].includes(employee.submitProfileStatus) && (
                        <EyeOutlined
                            className="text-green-600 text-lg"
                            onClick={() => {
                                setEmployeeId(employee.id);
                                if (
                                    employee.submitProfileStatus ===
                                    BEEN_APPEOVED
                                ) {
                                    {
                                        if (role === ROLE.MANAGE) {
                                            dispatch(
                                                setOpen({
                                                    ...open,
                                                    modalProfile: true,
                                                })
                                            );
                                        } else {
                                            dispatch(
                                                setOpen({
                                                    ...open,
                                                    modalUpdateHappening: true,
                                                })
                                            );
                                        }
                                    }
                                } else if (
                                    employee.submitProfileStatus ===
                                    ACCEPT_REQUEST_END_PROFILE
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
                    {[NEW_SAVE, REJECT, ADDITIONAL_REQUIREMENTS].includes(
                        employee.submitProfileStatus
                    ) && (
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
                </div>
            ),
        },
    ];
    const handleDeleteEmployee = async (id) => {
        const res = await deleteEmployee(id);
        if (res?.data?.code === STATUS.SUCCESS) {
            dispatch(
                getAllEmployee(
                    `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`
                )
            );
        }
    };
    return (
        <>
            <div className="main-table">
                <Table
                    scroll={{ x: true }}
                    bordered
                    columns={columns}
                    dataSource={listEmployee}
                    loading={isLoading}
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ["1", "10", "20", "30"],
                        locale: {
                            items_per_page: "bản ghi / trang",
                        },
                    }}
                />
            </div>
            <Modal
                centered
                footer={
                    <div className="text-center">
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                setOpenReject(false);
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
                title={getModalTitle(reasonForRejection?.submitProfileStatus)}
                onCancel={() => {
                    setOpenReject(false);
                }}
                open={openReject}
            >
                {reasonForRejection?.reasonForRefuseEndProfile ||
                    reasonForRejection?.reasonForRejection ||
                    reasonForRejection?.additionalRequestTermination}
            </Modal>
            <ModalDelete
                handleDeleteEmployee={handleDeleteEmployee}
                employeeIdToDelete={employeeIdToDelete}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            ></ModalDelete>
        </>
    );
};

export default TableComponet;

const getModalTitle = (submitProfileStatus) => {
    switch (submitProfileStatus) {
        case STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS_END_PROFILE:
            return "YÊU CẦU BỔ SUNG VÀO ĐƠN KẾT THÚC";
        case STATUS_EMPLOYEE.REJECT_REQUEST_END_PROFILE:
            return "LÝ DO TỪ CHỐI YÊU CẦU KẾT THÚC HỒ SƠ";
        case STATUS_EMPLOYEE.REJECT:
            return "LÍ DO TỪ CHỐI";
        default:
            return "YÊU CẦU BỔ SUNG";
    }
};
