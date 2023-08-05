import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Modal, Result, Table, Tabs } from "antd";
import { getProcess } from "../../services/api";
import { format } from "date-fns";
import ResumeModal from "../resume/ResumeModal";
import { useSelector } from "react-redux";
import TextToTruncate from "../../hook/TextToTruncate";
import PromoteTab from "../process/ProcessChildren";
import StringStatus from "../common/StringStatus";

export default function Promote() {
    const { role } = useSelector((state) => state.account);
    const [profile, setProfile] = useState({});
    const [processEmp, setProcessEmp] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleGetProcess = async () => {
        const res = await getProcess();
        setProcessEmp(res?.data?.data);
    };
    useEffect(() => {
        handleGetProcess();
    }, []);
    const columns = [
        {
            title: "STT",
            key: "index",
            width: 60,
            render: (text, record, index) => (
                <b className="block text-center">{index + 1}</b>
            ),
        },
        {
            title: "Ngày thăng chức",
            key: "promotionDay",
            dataIndex: "promotionDay",
            align: "center",
            width: 150,
            render: (date, index) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Lần thứ",
            key: "times",
            dataIndex: "times",
            width: 90,
            align: "center",
        },
        {
            title: "Chức vụ cũ",
            key: "currentPosition",
            dataIndex: "currentPosition",
            align: "center",
            width: 160,
            render: (currentPosition) => {
                switch (currentPosition) {
                    case 0:
                        return "Giám đốc";
                    case 1:
                        return "Giám đốc";
                    case 2:
                        return "Trưởng phòng";
                    case 3:
                        return "Quản lí";
                    case 4:
                        return "Quản lí";
                    default:
                        return "Giám đốc";
                }
            },
        },
        {
            title: "Chức vụ hiện tại",
            key: "newPosition",
            dataIndex: "newPosition",
            align: "center",
            width: 160,
            render: (newPosition) => {
                switch (newPosition) {
                    case 0:
                        return "Giám đốc";
                    case 1:
                        return "Trưởng phòng";
                    case 2:
                        return "Trưởng phòng";
                    case 3:
                        return "Trưởng phòng";
                    case 4:
                        return "Quản lí";
                    default:
                        return "Giám đốc";
                }
            },
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
            render: (note) => TextToTruncate(note || "", 40),
        },
        {
            title: "Trạng thái",
            key: "processStatus",
            dataIndex: "processStatus",
            align: "center",
            width: 200,
            render: (_, status) => StringStatus(status.processStatus),
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            width: 130,
            render: (_, user, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                        setIsModalOpen(true);
                        setProfile(user);
                    }}
                >
                    <EyeOutlined className="text-green-600 text-lg" />
                </div>
            ),
        },
    ];
    return (
        <div>
            {role === 5 ? (
                <>
                    <div className="main-table">
                        <Table
                            columns={columns}
                            dataSource={processEmp}
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
                        title="Biểu mẫu"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={1300}
                        centered
                        footer={
                            <div className="text-center flex justify-center">
                                <ResumeModal
                                    handleGetProcess={handleGetProcess}
                                    setIsOpen={setIsModalOpen}
                                    profile={profile}
                                    type="Promote"
                                />
                                <Button
                                    className="ml-2"
                                    type="primary"
                                    danger
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Hủy
                                </Button>
                            </div>
                        }
                    >
                        <Tabs
                            style={{ height: 600, overflowY: "scroll" }}
                            tabPosition="left"
                            defaultActiveKey="1"
                            items={[
                                {
                                    key: "1",
                                    label: `THĂNG CHỨC`,
                                    children: <PromoteTab profile={profile} />,
                                },
                            ]}
                        />
                    </Modal>
                </>
            ) : (
                <Result
                    icon={<SmileOutlined />}
                    title="Yêu cầu tài khoản manager để truy cập."
                />
            )}
        </div>
    );
}
