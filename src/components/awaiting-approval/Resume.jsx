import React, { useEffect, useState } from "react";
import ResumeModal from "../resume/ResumeModal";
import { useDispatch, useSelector } from "react-redux";
import { Button, ConfigProvider, Empty, Modal, Table, Tabs } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import QuitJob from "../modal-quit-job/QuitJob";
import {
    GENDER,
    STATUS_EMPLOYEE,
    TABLE_PAGINATION,
    TABS,
    TYPE_WAITING,
} from "../../constants/constants";
import {
    getAllEmployee,
    getEmployee,
} from "../../redux/employee/employeeSlice";
import EmployeeProfile from "../modal-employee-profile/EmployeeProfile";
import StringStatus from "../common/StringStatus";
import TeamStatus from "../common/TeamStatus";
import InputSearch from "../InputSearch";
import STT from "../common/STT";
import TextToTruncate from "../common/TextToTruncate";
import ModalProfile from "../modal-employee-profile/ModalProfile";
export default function Resume() {
    const dispatch = useDispatch();
    const { employee, listEmployee } = useSelector((state) => state.employee);
    const [profile, setProfile] = useState({});
    const [reasonForEnding, setReasonForEnding] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeKey, setActiveKey] = useState("1");
    const [threeInfo, setThreeInfo] = useState({
        knowledge: profile?.knowledge || "",
        skill: profile?.skill || "",
        activity: profile?.activity || "",
    });
    const { PENDING, PROFILE_END_REQUEST } = STATUS_EMPLOYEE;

    useEffect(() => {
        dispatch(
            getAllEmployee({ status: `${PENDING},${PROFILE_END_REQUEST}` })
        );
    }, []);

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
            width: 300,
            render: (address) => {
                const addressText = TextToTruncate(address, 35);
                return <p className="text-left">{addressText}</p>;
            },
        },
        {
            title: "Trạng thái",
            key: "submitProfileStatus",
            dataIndex: "submitProfileStatus",
            width: 180,
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
        <div>
            <div className="mb-4 text-right">
                <InputSearch status={`${PENDING},${PROFILE_END_REQUEST}`} />
            </div>
            <div className="main-table">
                <ConfigProvider
                    renderEmpty={() => (
                        <>
                            <Empty description={false} />
                        </>
                    )}
                >
                    <Table
                        bordered
                        columns={columns}
                        dataSource={STT(listEmployee)}
                        scroll={{
                            y: 490,
                        }}
                        pagination={TABLE_PAGINATION}
                    />
                </ConfigProvider>
            </div>
            <Modal
                zIndex={1}
                title="BIỂU MẪU"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => {
                    setIsModalOpen(false);
                    setActiveKey(TABS.RESUME.CODE);
                }}
                width={1300}
                centered
                footer={
                    <div className="text-center flex justify-center pb-5">
                        <ResumeModal
                            setIsOpen={setIsModalOpen}
                            profile={profile}
                            setProfile={setProfile}
                            type={TYPE_WAITING.RESUME}
                        />
                        <Button
                            className="ml-2"
                            type="primary"
                            danger
                            onClick={() => {
                                setIsModalOpen(false);
                                setActiveKey(TABS.RESUME.CODE);
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                {employee?.submitProfileStatus === PROFILE_END_REQUEST ? (
                    <Tabs
                        tabPosition="left"
                        items={[
                            {
                                key: "1",
                                label: `ĐƠN XIN NGHỈ VIỆC`,
                                children: (
                                    <QuitJob
                                        reasonForEnding={reasonForEnding}
                                        setReasonForEnding={setReasonForEnding}
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
            <ModalProfile />
        </div>
    );
}
