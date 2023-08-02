import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Result, Row, Table, Tabs } from "antd";
import {
    getByEmpIdProposal,
    getEmployeeById,
    getProposal,
} from "../../services/api";
import { format } from "date-fns";
import ResumeModal from "../resume/ResumeModal";
import { useSelector } from "react-redux";
import useTruncateText from "../../hook/useTruncateText";

export default function Propose() {
    const { role } = useSelector((state) => state.account);
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
            align: "center",
            width: 150,
            render: (date) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Loại",
            key: "type",
            dataIndex: "type",
            width: 140,
            align: "center",
            render: (type) => {
                return type === 1 ? "Đề xuất" : "Tham mưu";
            },
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
            render: (note) => useTruncateText(note || "", 25),
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
            render: (detailedDescription) =>
                useTruncateText(detailedDescription || "", 25),
        },
        {
            title: "Trạng thái",
            key: "proposalStatus",
            dataIndex: "proposalStatus",
            align: "center",
            width: 200,
            render: (_, status) => {
                switch (status.proposalStatus) {
                    case 0:
                        return "Nộp lưu hồ sơ";
                    case 1:
                        return "Lưu mới";
                    case 2:
                        return "Chờ xử lí";
                    case 3:
                        return "Đã được chấp nhận";
                    case 4:
                        return "Yêu cầu bổ sung";
                    case 5:
                        return "Từ chối";
                    case 6:
                        return "Yêu cầu kết thúc hồ sơ";
                    case 7:
                        return "Chấp nhận yêu cầu kết thúc hồ sơ";
                    case 8:
                        return "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
                    case 9:
                        return "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        break;
                }
            },
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
                            dataSource={proposeEmp}
                            pagination={{
                                pageSize: 10,
                            }}
                            scroll={{
                                y: 490,
                            }}
                        />
                    </div>
                    <Modal
                        title="Biểu mẫu"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={1300}
                        centered
                        footer={
                            <div className="text-center flex justify-center">
                                <ResumeModal
                                    setIsOpen={setIsModalOpen}
                                    profile={profile}
                                    handleGetProposal={handleGetProposal}
                                    type="Propose"
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
        <div
            className="p-[35px] bg-[#e7e7e7] font"
            style={{
                fontFamily: "Tinos",
            }}
        >
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
                    <p className="font-bold">Về việc {data?.content}</p>
                </div>
                <div className="flex justify-center mt-5 p-20">
                    <div className="leading-9">
                        <p className="block">
                            Kính gửi: Giám đốc công ty Ocean Tech
                        </p>
                        <p className="block">
                            Tôi tên là: {emp.name} sinh ngày:{" "}
                            {emp.dateOfBirth &&
                                format(emp.dateOfBirth, "yyyy/MM/dd")}
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
