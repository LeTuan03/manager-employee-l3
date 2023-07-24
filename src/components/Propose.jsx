import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Result, Row, Table, Tabs } from "antd";
import {
    getByEmpIdProposal,
    getEmployeeById,
    getProposal,
} from "../services/api";
import { format } from "date-fns";
import ResumeModal from "./ResumeModal";

export default function Propose() {
    const [profile, setProfile] = useState({});
    const [proposeEmp, setProposeEmp] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleGetProposal = async () => {
        const res = await getProposal();
        setProposeEmp(res?.data?.data);
    };
    useEffect(() => {
        handleGetProposal();
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
            title: "Ngày diễn biến",
            key: "proposalDate",
            dataIndex: "proposalDate",
            render: (date) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Loại",
            key: "type",
            dataIndex: "type",
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
        },
        {
            title: "Nội dung",
            key: "content",
            dataIndex: "content",
            className: "truncate",
        },
        {
            title: "Mô tả chi tiết",
            key: "detailedDescription",
            dataIndex: "detailedDescription",
        },
        {
            title: "Trạng thái",
            key: "proposalStatus",
            dataIndex: "proposalStatus",
            render: (_, status) => {
                let statusProcess;
                switch (status.proposalStatus) {
                    case "2":
                        statusProcess = "Chờ xử lý";
                    default:
                        statusProcess = "Chờ xử lý";
                }
                return <>{statusProcess}</>;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            render: (_, user) => (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        console.log(user);
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
            {localStorage.getItem("role") === "5" ? (
                <>
                    <Table
                        columns={columns}
                        dataSource={proposeEmp}
                        pagination={{
                            pageSize: 10,
                        }}
                        scroll={{
                            y: 490,
                        }}
                    />
                    <Modal
                        title="Biểu mẫu"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={1300}
                        centered
                        footer={
                            <div className="text-center flex justify-center">
                                <ResumeModal profile={profile} type="Propose" />
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
                                    label: `ĐỀ XUẤT/THAM MƯU`,
                                    children: <ProposeTab profile={profile} />,
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
const ProposeTab = ({ profile }) => {
    const [data, setData] = useState({});
    const [emp, setEmp] = useState({});
    const handleGetDetailPromote = async () => {
        const res = await getByEmpIdProposal(profile.employeeId);
        const res2 = await getEmployeeById(profile.employeeId);
        setData(res?.data?.data[0]);
        setEmp(res2?.data?.data);
    };
    useEffect(() => {
        handleGetDetailPromote();
    }, [profile]);
    return (
        <div className="p-[35px] bg-[#e7e7e7]">
            <div className="bg-white p-[64px]">
                <Row>
                    <Col flex={2} className="text-center">
                        <h3>CÔNG TY OCEAN TECH</h3>
                        <p>Số: {profile.employeeId}</p>
                    </Col>
                    <Col flex={3} className="text-center">
                        <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <h4>Độc lập - Tự do - Hạnh phúc</h4>
                        ----------------------------
                    </Col>
                </Row>
                <div className="text-center">
                    <h3 className="mt-10"> ĐƠN THAM MƯU </h3>
                    <p className="font-bold">Về việc {data.content}</p>
                </div>
                <div className="flex justify-center mt-5 p-20">
                    <div className="leading-9">
                        <p className="block">
                            Kính gửi: Giám đốc công ty Ocean Tech
                        </p>
                        <p className="block">
                            Tôi tên là: {emp.name} sinh ngày: {emp.dateOfBirth}
                        </p>
                        <p className="block">
                            Tôi xin trình bày với nội dung sự việc như sau:
                        </p>
                        <p className="block">{data.detailedDescription}</p>
                        <p className="block">
                            Tôi xin cam đoan những thông tin mà tôi đã nêu trên
                            đây là đúng sự thật và xin chịu trách nhiệm về tính
                            chính xác, trung thực của những thông tin này. Kính
                            mong Ông/Bà xem xét và chấp nhận nguyện vọng trên
                            của tôi.
                        </p>
                        <p className="block">Tôi xin chân thành cảm ơn!</p>
                    </div>
                </div>

                <div className="mt-10">
                    <Row>
                        <Col flex={3} className="text-center"></Col>
                        <Col flex={2} className="text-center">
                            <i>Hà Nội, ngày ... tháng ... năm 2023</i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i>(Ký, ghi rõ họ tên)</i>

                            <b className="block mt-5">{emp.name}</b>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
