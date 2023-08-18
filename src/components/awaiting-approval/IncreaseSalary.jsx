import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import {
    Modal,
    Result,
    Table,
    Button,
    Tabs,
    ConfigProvider,
    Empty,
} from "antd";
import { getSalaryIncreaseByCurrentLeader } from "../../services/api";
import { format } from "date-fns";
import ResumeModal from "../resume/ResumeModal";
import { useSelector } from "react-redux";
import IncreaseTab from "../increasesalary/IncreaseSalaryChildren";
import NumberStatus from "../common/NumberStatus";
import STT from "../common/STT";
import TextToTruncate from "../common/TextToTruncate";
import { ROLE } from "../../constants/constants";

export default function IncreaseSalary() {
    const { role } = useSelector((state) => state.account);
    const [profile, setProfile] = useState({});
    const [dataSalary, setDataSalary] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getCurrentEmpIncreaseSalary = async () => {
        const res = await getSalaryIncreaseByCurrentLeader();
        setDataSalary(res?.data?.data);
    };
    useEffect(() => {
        getCurrentEmpIncreaseSalary();
    }, []);
    const columns = [
        {
            title: "STT",
            key: "index",
            width: 60,
            align: "center",
            render: (_, item) => <>{item?.index + 1}</>,
        },
        {
            title: "Ngày tăng lương",
            key: "startDate",
            dataIndex: "startDate",
            align: "center",
            width: 150,
            render: (date) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Lần thứ",
            key: "times",
            dataIndex: "times",
            width: 90,
            align: "center",
        },
        {
            title: "Lương cũ",
            key: "oldSalary",
            dataIndex: "oldSalary",
            align: "center",
            width: 120,
        },
        {
            title: "Lương mới",
            key: "newSalary",
            dataIndex: "newSalary",
            align: "center",
            width: 120,
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
            width: 200,
            align: "center",
            render: (note) => (
                <p className="text-left">{TextToTruncate(note || "", 25)}</p>
            ),
        },
        {
            title: "Lý do",
            key: "reason",
            dataIndex: "reason",
            width: 240,
            align: "center",
            render: (reason) => (
                <p className="text-left">{TextToTruncate(reason || "", 25)}</p>
            ),
        },
        {
            title: "Trạng thái",
            key: "salaryIncreaseStatus",
            dataIndex: "salaryIncreaseStatus",
            align: "center",
            width: 180,
            render: (_, status) => NumberStatus(status.salaryIncreaseStatus),
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            width: 130,
            render: (_, user) => (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setProfile(user);
                        setIsModalOpen(true);
                    }}
                >
                    <EyeOutlined className="text-green-600 text-lg" />
                </div>
            ),
        },
    ];

    return (
        <div>
            {role === ROLE.MANAGE ? (
                <>
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
                                dataSource={STT(dataSalary)}
                                pagination={{
                                    showSizeChanger: true,
                                    pageSizeOptions: ["1", "10", "20", "30"],
                                    locale: {
                                        items_per_page: "bản ghi / trang",
                                    },
                                }}
                                scroll={{
                                    y: 490,
                                }}
                            />
                        </ConfigProvider>
                    </div>
                    <Modal
                        zIndex={1}
                        title="Biểu mẫu"
                        open={isModalOpen}
                        onOk={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                        width={1300}
                        centered
                        footer={
                            <div className="text-center flex justify-center pb-5">
                                <ResumeModal
                                    getCurrentEmpIncreaseSalary={
                                        getCurrentEmpIncreaseSalary
                                    }
                                    setIsOpen={setIsModalOpen}
                                    profile={profile}
                                    type="IncreaseSalary"
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
                                    label: `TĂNG LƯƠNG`,
                                    children: <IncreaseTab profile={profile} />,
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
