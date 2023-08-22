import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { deleteEmployee } from "../services/api";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    getEmployee,
    setOpen,
} from "../redux/employee/employeeSlice";
import { GENDER, ROLE, STATUS, STATUS_EMPLOYEE } from "../constants/constants";
import ModalDelete from "./ModalDelete";
import StringStatus from "./common/StringStatus";
import TeamStatus from "./common/TeamStatus";
import TextToTruncate from "./common/TextToTruncate";
import TablePagination from "./common/TablePagination";
const TableComponet = () => {
    const [reasonForRejection, setReasonForRejection] = useState("");
    const [openReject, setOpenReject] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
    const dispatch = useDispatch();
    const { open, listEmployee, isLoading } = useSelector(
        (state) => state.employee
    );
    const { role } = useSelector((state) => state.account);
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

    const data = listEmployee.map((item, index) => {
        return { ...item, index };
    });

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 60,
            align: "center",
            render: (_, item) => <>{item?.index + 1}</>,
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            width: 200,
            align: "center",
            render: (name) => (
                <div className="text-left">{TextToTruncate(name, 22)}</div>
            ),
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
                <p>
                    {gender === GENDER.FEMALE
                        ? "Nữ"
                        : gender === GENDER.MALE
                        ? "Nam"
                        : "Khác"}
                </p>
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
            render: (team) => TeamStatus(team),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            align: "center",
            render: (address) => {
                const addressText = TextToTruncate(address || "", 30);
                return (
                    <div
                        className="cursor-default text-left !min-w-[100px]"
                        title={address}
                    >
                        {addressText}
                    </div>
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
                    <span
                        className="cursor-default"
                        title={StringStatus(status)}
                    >
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
                                dispatch(getEmployee(employee.id));
                                if (
                                    [
                                        ADDITIONAL_REQUIREMENTS_END_PROFILE,
                                        REJECT_REQUEST_END_PROFILE,
                                        BEEN_APPEOVED,
                                    ].includes(employee.submitProfileStatus)
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
                                dispatch(getEmployee(employee.id));
                                dispatch(
                                    setOpen({ ...open, modalInput: true })
                                );
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
                getAllEmployee({
                    status: `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`,
                })
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
                    dataSource={data}
                    pagination={TablePagination}
                />
            </div>
            <Modal
                centered
                footer={
                    <div className="text-center pb-5">
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
                title={getStatus(reasonForRejection?.submitProfileStatus)}
                onCancel={() => {
                    setOpenReject(false);
                }}
                open={openReject}
            >
                {getInfo(
                    reasonForRejection.submitProfileStatus,
                    reasonForRejection
                )}
            </Modal>
            {openDelete && (
                <ModalDelete
                    handleDeleteEmployee={handleDeleteEmployee}
                    employeeIdToDelete={employeeIdToDelete}
                    openDelete={openDelete}
                    loading={isLoading}
                    setOpenDelete={setOpenDelete}
                ></ModalDelete>
            )}
        </>
    );
};

export default TableComponet;

const getStatus = (status) => {
    switch (status) {
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
const getInfo = (status, reasonForRejection) => {
    switch (status) {
        case STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS_END_PROFILE:
            return reasonForRejection.additionalRequestTermination;
        case STATUS_EMPLOYEE.REJECT_REQUEST_END_PROFILE:
            return reasonForRejection?.reasonForRefuseEndProfile;
        case STATUS_EMPLOYEE.REJECT:
            return reasonForRejection?.reasonForRejection;
        default:
            return reasonForRejection?.additionalRequest;
    }
};
