import React, { useEffect, useState } from "react";
import { searchEmployee } from "../../services/api";
import ResumeModal from "../resume/ResumeModal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Result, Table, Tabs } from "antd";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import TextToTruncate from "../../hook/TextToTruncate";
import { format } from "date-fns";
import QuitJob from "../modal-quit-job/QuitJob";
import { GENDER, STATUS_EMPLOYEE } from "../../constants/constants";
import { getEmployee } from "../../redux/employee/employeeSlice";
import EmployeeProfile from "../modal-employee-profile/EmployeeProfile";
import StringStatus from "../common/StringStatus";
import TeamStatus from "../common/TeamStatus";

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
    const { PENDING, PROFILE_END_REQUEST } = STATUS_EMPLOYEE;
    const getAllEmployee = async () => {
        setLoading(true);
        const res = await searchEmployee(`${PENDING},${PROFILE_END_REQUEST}`);
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
            align: "center",
            render: (_, item, index) => <b>{index + 1}</b>,
        },

        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            width: 170,
            align: "center",
            render: (text) => (
                <p className="text-left">{TextToTruncate(text, 20)}</p>
            ),
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
            render: (team) => TeamStatus(team),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            align: "center",
            render: (address) => {
                const addressText = TextToTruncate(address, 35);
                return <p className="text-left">{addressText}</p>;
            },
        },
        {
            title: "Trạng thái",
            key: "submitProfileStatus",
            dataIndex: "submitProfileStatus",
            width: 200,
            align: "center",
            render: (status) => {
                return (
                    <span
                        className="cursor-default"
                        title={StringStatus(status)}
                    >
                        {TextToTruncate(StringStatus(status), 25)}
                    </span>
                );
            },
        },
        {
            title: "Thao tác",
            key: "action",
            width: 100,
            align: "center",
            render: (_, user) => (
                <div className="flex justify-center gap-3">
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
                                bordered
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
                            {employee?.submitProfileStatus ===
                            PROFILE_END_REQUEST ? (
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
