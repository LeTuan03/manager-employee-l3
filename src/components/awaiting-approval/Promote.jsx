import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Result, Row, Table, Tabs } from "antd";
import {
    getByEmpIdProcess,
    getEmployeeById,
    getProcess,
} from "../../services/api";
import { format } from "date-fns";
import ResumeModal from "../resume/ResumeModal";
import { useSelector } from "react-redux";
import useTruncateText from "../../hook/useTruncateText";
import getDayMonthYear from "../common/getCurrentDay";

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
            render: (note) => useTruncateText(note || "", 40),
        },
        {
            title: "Trạng thái",
            key: "processStatus",
            dataIndex: "processStatus",
            align: "center",
            width: 200,
            render: (_, status, index) => {
                switch (status.processStatus) {
                    case "0":
                        return "Nộp lưu hồ sơ";
                    case "1":
                        return "Lưu mới";
                    case "2":
                        return "Chờ xử lí";
                    case "3":
                        return "Đã được chấp nhận";
                    case "4":
                        return "Yêu cầu bổ sung";
                    case "5":
                        return "Từ chối";
                    case "6":
                        return "Yêu cầu kết thúc hồ sơ";
                    case "7":
                        return "Chấp nhận yêu cầu kết thúc hồ sơ";
                    case "8":
                        return "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
                    case "9":
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

const PromoteTab = ({ profile }) => {
    const [data, setData] = useState({});
    const [emp, setEmp] = useState({});
    const handleGetDetailPromote = async () => {
        const res = await getByEmpIdProcess(profile.employeeId);
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
            s
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
                    <h3 className="mt-10"> QUYẾT ĐỊNH </h3>
                    <p className="font-bold">
                        Về Việc Bổ Nhiệm Cán Bộ, Công Chức
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="leading-9">
                        <i className="block">
                            - Căn cứ Nghị định số 138/2020 Nghị định của Chính
                            phủ quy định về tuyển dụng, sử dụng và quản lý công
                            chức.
                        </i>
                        <i className="block">
                            - Căn cứ Luật tổ chức chính quyền địa phương được
                            Quốc hội thông qua ngày 19 tháng 06 năm 2015;
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
                            <b> Điều 1: </b> Bổ nhiệm Ông/Bà: {emp.name}
                            giữ chức vụ kể từ ngày{" "}
                            {data.promotionDay &&
                                format(
                                    new Date(data.promotionDay).getTime(),
                                    "yyyy-MM-dd"
                                )}
                            .
                        </div>
                        <div>
                            <b>Điều 2:</b> Quyết định này có hiệu lực kể từ ngày
                            ký.
                        </div>
                        <div>
                            <b>Điều 3:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {emp.name} chịu trách nhiệm
                            thi hành quyết định này.
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <Row>
                        <Col flex={3} className="text-center"></Col>
                        <Col flex={2} className="text-center">
                            <i>
                                Hà Nội, ngày{" "}
                                {profile.promotionDay &&
                                    getDayMonthYear(profile.promotionDay)
                                        .day}{" "}
                                tháng{" "}
                                {profile.promotionDay &&
                                    getDayMonthYear(profile.promotionDay)
                                        .month}{" "}
                                năm{" "}
                                {profile.promotionDay &&
                                    getDayMonthYear(profile.promotionDay)
                                        .year}{" "}
                            </i>
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
