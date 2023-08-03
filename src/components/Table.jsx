import React, { useState } from "react";
import { Button, Input, Modal, Table, Tag } from "antd";
import useTruncateText from "../hook/useTruncateText";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    SearchOutlined,
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
                <p className="text-center">
                    {gender === GENDER.FEMALE
                        ? "Nữ"
                        : gender === GENDER.MALE
                        ? "Nam"
                        : "Khác"}{" "}
                </p>
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
                        color={
                            team === TEAM.BE
                                ? "geekblue"
                                : team === TEAM.FE
                                ? "green"
                                : "red"
                        }
                        className="w-full text-center"
                    >
                        {team === TEAM.BE
                            ? "Back-end"
                            : team === TEAM.FE
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
                    case SUBMIT_FILE_SAVE:
                        status = "Nộp lưu hồ sơ";
                        break;
                    case NEW_SAVE:
                        status = "Lưu mới";
                        break;
                    case PENDING:
                        status = "Chờ xử lí";
                        break;
                    case BEEN_APPEOVED:
                        status = "Đã được chấp nhận";
                        break;
                    case ADDITIONAL_REQUIREMENTS:
                        status = "Yêu cầu bổ sung";
                        break;
                    case REJECT:
                        status = "Từ chối";
                        break;
                    case PROFILE_END_REQUEST:
                        status = "Yêu cầu kết thúc hồ sơ";
                        break;
                    case ACCEPT_REQUEST_END_PROFILE:
                        status = "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case ADDITIONAL_REQUIREMENTS_END_PROFILE:
                        status = "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
                        break;
                    case REJECT_REQUEST_END_PROFILE:
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
                    {[
                        REJECT_REQUEST_END_PROFILE,
                        ADDITIONAL_REQUIREMENTS_END_PROFILE,
                        REJECT,
                        ADDITIONAL_REQUIREMENTS,
                    ].includes(employee.submitProfileStatus) && (
                        <span>
                            <InfoCircleOutlined
                                onClick={() => {
                                    setReasonForRejection(
                                        employee?.reasonForRefuseEndProfile ||
                                            employee?.reasonForRejection
                                    );
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
    const onSearch = (value) => console.log(value.target.value);
    return (
        <>
            <div className="flex justify-end mb-5 z-0">
                <div className="!w-[30%]">
                    <Input
                        placeholder="Tìm kiếm ..."
                        allowClear
                        addonAfter={<SearchOutlined />}
                        size="large"
                        onChange={onSearch}
                    />
                </div>
            </div>
            <div className="main-table">
                <Table
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
                title="LÍ DO TỪ CHỐI"
                onCancel={() => {
                    setOpenReject(false);
                }}
                open={openReject}
            >
                {reasonForRejection}
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
