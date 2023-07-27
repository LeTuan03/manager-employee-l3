import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Col, Row, Modal, Result, Table, Button, Tabs } from "antd";
import {
    getByEmpIdSalary,
    getEmployeeById,
    getSalaryIncreaseByCurrentLeader,
} from "../services/api";
import { format } from "date-fns";
import ResumeModal from "./ResumeModal";
import { useSelector } from "react-redux";

export default function IncreaseSalary() {
    const { role } = useSelector((state) => state.account);
    const [profile, setProfile] = useState({});
    const [dataSalary, setDataSalary] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
            render: (text, record, index) => (
                <b className="block text-center">{index + 1}</b>
            ),
        },
        {
            title: "Ngày tăng lương",
            key: "startDate",
            dataIndex: "startDate",
            render: (date) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Lần thứ",
            key: "times",
            dataIndex: "times",
        },
        {
            title: "Lương cũ",
            key: "oldSalary",
            dataIndex: "oldSalary",
        },
        {
            title: "Lương mới",
            key: "newSalary",
            dataIndex: "newSalary",
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
        },
        {
            title: "Lý do",
            key: "reason",
            dataIndex: "reason",
        },
        {
            title: "Trạng thái",
            key: "salaryIncreaseStatus",
            dataIndex: "salaryIncreaseStatus",
            render: (_, status) => {
                let statusSalary;
                switch (status.salaryIncreaseStatus) {
                    case "2":
                        statusSalary = "Chờ xử lý";
                    default:
                        statusSalary = "Chờ xử lý";
                }
                return <>{statusSalary}</>;
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
                    <Table
                        columns={columns}
                        dataSource={dataSalary}
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
                                <ResumeModal
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

const IncreaseTab = ({ profile }) => {
    const [data, setData] = useState({});
    const [emp, setEmp] = useState({});
    const handleGetDetailSalary = async () => {
        const res = await getByEmpIdSalary(profile.employeeId);
        const res2 = await getEmployeeById(profile.employeeId);
        setData(res?.data?.data[0]);
        setEmp(res2?.data?.data);
    };
    useEffect(() => {
        handleGetDetailSalary();
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
                            <b> Điều 1: </b> Kể từ ngày: {data?.startDate} , mức
                            lương của Ông/Bà: {emp.name} sẽ là: {data.newSalary}{" "}
                            đ.
                        </div>
                        <div>
                            <b>Điều 2:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {emp.name} căn cứ quyết
                            định thi hành.
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

                            <b className="block mt-5">{emp.name}</b>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
