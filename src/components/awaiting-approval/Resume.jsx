import React, { useEffect, useState } from "react";
import { searchEmployee } from "../../services/api";
import ResumeModal from "../resume/ResumeModal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Result, Table, Tabs, Tag } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import TextToTruncate from "../../hook/TextToTruncate";
import { format } from "date-fns";
import QuitJob from "../modal-quit-job/QuitJob";
import { GENDER, ROLE, STATUS_EMPLOYEE, TEAM } from "../../constants/constants";
import { getEmployee, setOpen } from "../../redux/employee/employeeSlice";
import EmployeeProfile from "../modal-employee-profile/EmployeeProfile";

export default function Resume() {
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.account);
    const { employee } = useSelector((state) => state.employee);
    const [profile, setProfile] = useState({});
    const [reasonForEnding, setReasonForEnding] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listEmployee, setListEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeKey, setActiveKey] = useState("1");

    const [threeInfo, setThreeInfo] = useState({
        knowledge: employee?.knowledge || "",
        skill: employee?.skill || "",
        activity: employee?.activity || "",
    });
    const getAllEmployee = async () => {
        setLoading(true);
        const res = await searchEmployee(
            `${STATUS_EMPLOYEE.PENDING},${STATUS_EMPLOYEE.PROFILE_END_REQUEST}`
        );
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
            width: 170,
            render: (text) => TextToTruncate(text, 20),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            width: 130,
            align: "center",
            render: (dateOfBirth) => (
                <>{format(new Date(dateOfBirth).getTime(), "dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            width: 90,
            align: "center",
            render: (gender) => <>{gender === GENDER.FEMALE ? "Nữ" : "Nam"}</>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: 130,
            align: "center",
        },
        {
            title: "Nhóm",
            dataIndex: "team",
            key: "team",
            width: 120,
            align: "center",
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
                const addressText = TextToTruncate(address, 35);
                return <span>{addressText}</span>;
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
                        return <p>{TextToTruncate("Nộp lưu hồ sơ", 30)}</p>;
                    case "1":
                        return <p>{TextToTruncate("Lưu mới", 30)}</p>;
                    case "2":
                        return <p>{TextToTruncate("Chờ xử lí", 30)}</p>;
                    case "3":
                        return <p>{TextToTruncate("Đã được chấp nhận", 30)}</p>;
                    case "4":
                        return <p>{TextToTruncate("Yêu cầu bổ sung", 30)}</p>;
                    case "5":
                        return <p>{TextToTruncate("Từ chối", 30)}</p>;
                    case "6":
                        return (
                            <p>
                                {TextToTruncate("Yêu cầu kết thúc hồ sơ", 30)}
                            </p>
                        );
                    case "7":
                        return (
                            <p>
                                {TextToTruncate(
                                    "Chấp nhận yêu cầu kết thúc hồ sơ",
                                    30
                                )}
                            </p>
                        );
                    case "8":
                        return (
                            <p>
                                {TextToTruncate(
                                    "Yêu cầu bổ sung vào đơn kết thúc hồ sơ",
                                    30
                                )}
                            </p>
                        );
                    case "9":
                        return (
                            <p>
                                {TextToTruncate(
                                    "Từ chối yêu cầu kết thúc hồ sơ",
                                    30
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
            width: 100,
            align: "center",
            render: (_, user) => (
                <div className="flex justify-center gap-3">
                    {user.submitProfileStatus === STATUS_EMPLOYEE.NEW_SAVE &&
                    role === ROLE.MANAGE ? (
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
                                setReasonForEnding(user?.reasonForEnding);
                                dispatch(getEmployee(user.id));
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
                        <div className="main-table">
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
                        </div>
                        <Modal
                            zIndex={1}
                            title="BIỂU MẪU"
                            open={isModalOpen}
                            onOk={() => setIsModalOpen(false)}
                            onCancel={() => {
                                setIsModalOpen(false);
                                setActiveKey("1");
                            }}
                            width={1300}
                            centered
                            footer={
                                <div className="text-center flex justify-center">
                                    <ResumeModal
                                        setIsOpen={setIsModalOpen}
                                        profile={profile}
                                        type="Resume"
                                        getAllEmployee={getAllEmployee}
                                    />
                                    <Button
                                        className="ml-2"
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setActiveKey("1");
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            }
                        >
                            {employee?.submitProfileStatus === "6" ? (
                                <Tabs
                                    defaultActiveKey="1"
                                    tabPosition="left"
                                    items={[
                                        {
                                            key: "1",
                                            label: `ĐƠN XIN NGHỈ VIỆC`,
                                            children: (
                                                <QuitJob
                                                    reasonForEnding={
                                                        reasonForEnding
                                                    }
                                                    setReasonForEnding={
                                                        setReasonForEnding
                                                    }
                                                    employees={profile}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            ) : (
                                <div>
                                    <EmployeeProfile
                                        threeInfo={threeInfo}
                                        setThreeInfo={setThreeInfo}
                                        activeKey={activeKey}
                                        setActiveKey={setActiveKey}
                                    ></EmployeeProfile>
                                </div>
                            )}
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
