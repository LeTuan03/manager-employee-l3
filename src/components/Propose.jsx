import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Result, Row, Table, Tabs } from "antd";
import { getProposal } from "../services/api";
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
                    <h3 className="mt-10"> QUYẾT ĐỊNH </h3>
                    <p className="font-bold">
                        Về việc tăng lương cho người lao động
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="leading-9">
                        <i className="block">
                            - Căn cứ vào quy chế lương thưởng và Điều lệ hoạt
                            động của công ty Ocean Tech.
                        </i>
                        <i className="block">
                            - Căn cứ hợp đồng lao động số …/HĐLĐ-...., ngày ….
                            tháng …. năm 20…..
                        </i>
                        <i className="block">
                            - Căn cứ những đóng góp thực tế đối với sự phát
                            triển của Công ty
                        </i>
                    </div>
                </div>
                <div className="text-center m-9">
                    <h3>GIÁM ĐỐC CÔNG TY OCEANTECH</h3>
                    <h3> QUYẾT ĐỊNH</h3>
                </div>
                <div className="flex justify-center leading-10">
                    <div>
                        <div>
                            <b> Điều 1: </b> Kể từ ngày: 28 tháng 6 năm 2023 ,
                            mức lương của Ông/Bà: yyy sẽ là: 4 đồng
                        </div>
                        <div>
                            <b>Điều 2:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: yyy căn cứ quyết định thi
                            hành.
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <Row>
                        <Col flex={3} className="text-center"></Col>
                        <Col flex={2} className="text-center">
                            <i>Hà Nội, ngày 21 tháng 7 năm 2023</i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i>(Ký, ghi rõ họ tên)</i>

                            <b className="block mt-5">Ky</b>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
