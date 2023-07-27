import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Image, Input, Modal, Row, Tabs } from "antd";
import React, { useState } from "react";
import {
    getProcessByEmp,
    getProposalByEmp,
    getSalaryByEmp,
} from "../services/api";
import { format } from "date-fns";
import TabIncreaseSalary from "./TabIncreaseSalary";
import TabProcess from "./TabProcess";
import TabRecommendation from "./TabRecommendation";

export default function UpdateHappeningModal({ employee }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [salary, setSalary] = useState([]);
    const [processs, setProcesss] = useState([]);
    const [recoments, setRecoments] = useState([]);

    const items = [
        {
            key: "1",
            label: `TĂNG LƯƠNG`,
            children: <TabIncreaseSalary employee={employee} salary={salary} />,
        },
        {
            key: "2",
            label: `THĂNG CHỨC`,
            children: <TabProcess employee={employee} processs={processs} />,
        },
        {
            key: "3",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: (
                <TabRecommendation employee={employee} recoments={recoments} />
            ),
        },
    ];

    const handleGetSalaryByEmp = async () => {
        const res = await getSalaryByEmp(employee.id);
        setSalary(res?.data?.data);
    };
    const handleGetProcessByEmp = async () => {
        const res = await getProcessByEmp(employee.id);
        setProcesss(res?.data?.data);
    };
    const handleGetRecomentByEmp = async () => {
        const res = await getProposalByEmp(employee.id);
        setRecoments(res?.data?.data);
    };
    return (
        <div>
            <span
                className="cursor-pointer"
                onClick={() => {
                    setIsModalOpen(true);
                    handleGetSalaryByEmp();
                    handleGetProcessByEmp();
                    handleGetRecomentByEmp();
                }}
            >
                <EyeOutlined className="text-green-600 text-lg" />
            </span>
            <Modal
                title="CẬP NHẬT DIỄN BIẾN"
                centered
                open={isModalOpen}
                width={1300}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <div className="text-center">
                        <Button key="submit" type="primary">
                            Kết thúc
                        </Button>
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => setIsModalOpen(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <Row className="mt-7">
                    <Col span={8} className="flex flex-col items-center">
                        <Image width={200} src={employee.image} />
                        <h1>{employee.name}</h1>
                        <b>
                            {employee.currentPosition === 3
                                ? "Front-end"
                                : employee.currentPosition === 2
                                ? "Back-end"
                                : "Tester"}
                        </b>
                    </Col>
                    <Col span={16}>
                        <Card
                            title="Thông tin nhân viên"
                            bordered={false}
                            className="w-full"
                        >
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>Họ và tên</Col>
                                <Col span={8}>Mã nhân viên </Col>
                                <Col span={8}>Số điện thoại</Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>
                                    <Input value={employee.name} />
                                </Col>
                                <Col span={8}>
                                    <Input value={employee.code} />
                                </Col>
                                <Col span={8}>
                                    <Input value={employee.phone} />
                                </Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>Email</Col>
                                <Col span={8}>CCCD/CMT</Col>
                                <Col span={8}>Ngày sinh</Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>
                                    <Input value={employee.email} />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        value={
                                            employee.citizenIdentificationNumber
                                        }
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        value={format(
                                            new Date(
                                                employee.dateOfBirth
                                            ).getTime(),
                                            "yyyy/MM/dd"
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <div className="mt-10">
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </Modal>
        </div>
    );
}
