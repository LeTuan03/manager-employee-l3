import { Button, Card, Col, Form, Image, Input, Modal, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import TabIncreaseSalary from "../increasesalary/TabIncreaseSalary";
import TabProcess from "../process/TabProcess";
import {
    getProcessByEmp,
    getProposalByEmp,
    getSalaryByEmp,
} from "../../services/api";
import TabRecommendation from "../proposal/TabRecommendation";
import { useDispatch, useSelector } from "react-redux";
import { resetEmployee, setOpen } from "../../redux/employee/employeeSlice";
import TeamStatus from "../common/TeamStatus";

export default function UpdateHappeningModal() {
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
    const [formSalary] = Form.useForm();
    const [formProcess] = Form.useForm();
    const [formRecoment] = Form.useForm();
    const [salary, setSalary] = useState([]);
    const [processs, setProcesss] = useState([]);
    const [recoments, setRecoments] = useState([]);
    const [activeKey, setActiveKey] = useState("1");
    const handleGetSalaryByEmp = async () => {
        try {
            const res = await getSalaryByEmp(employee?.id);
            setSalary(res?.data?.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleGetProcessByEmp = async () => {
        try {
            const res = await getProcessByEmp(employee?.id);
            setProcesss(res?.data?.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleGetRecomentByEmp = async () => {
        try {
            const res = await getProposalByEmp(employee?.id);
            setRecoments(res?.data?.data);
        } catch (error) {
            console.error(error);
        }
    };
    const items = [
        {
            key: "1",
            label: `TĂNG LƯƠNG`,
            children: (
                <TabIncreaseSalary
                    handleGetSalaryByEmp={handleGetSalaryByEmp}
                    salary={salary}
                    formSalary={formSalary}
                />
            ),
        },
        {
            key: "2",
            label: `THĂNG CHỨC`,
            children: (
                <TabProcess
                    handleGetProcessByEmp={handleGetProcessByEmp}
                    processs={processs}
                    formProcess={formProcess}
                />
            ),
        },
        {
            key: "3",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: (
                <TabRecommendation
                    handleGetRecomentByEmp={handleGetRecomentByEmp}
                    recoments={recoments}
                    formRecoment={formRecoment}
                />
            ),
        },
    ];
    useEffect(() => {
        if (employee?.id) {
            handleGetSalaryByEmp();
            handleGetProcessByEmp();
            handleGetRecomentByEmp();
        }
    }, [employee?.id]);
    return (
        <Modal
            className="!h-screen relative happening !w-[84%] max-lg:!w-[100%]"
            zIndex={3}
            title={
                <p className="fixed top-0 z-10 py-2 w-[80%] bg-white">
                    CẬP NHẬT DIỄN BIẾN
                </p>
            }
            centered
            open={open.modalUpdateHappening}
            onCancel={() => {
                dispatch(setOpen({ ...open, modalUpdateHappening: false }));
                dispatch(resetEmployee());
                setActiveKey("1");
            }}
            footer={
                <div className="text-center bg-white fixed bottom-0 !w-[82%] max-lg:!w-[92%] max-sm:!w-[90%] py-5">
                    <Button
                        className="min-w-[100px]"
                        key="submit"
                        type="primary"
                        onClick={() => {
                            dispatch(setOpen({ ...open, modalProfile: true }));
                        }}
                    >
                        Xem hồ sơ
                    </Button>
                    <Button
                        className="min-w-[100px]"
                        key="submit"
                        type="primary"
                        onClick={() => {
                            dispatch(setOpen({ ...open, modalEnd: true }));
                        }}
                    >
                        Kết thúc
                    </Button>
                    <Button
                        className="min-w-[100px]"
                        type="primary"
                        danger
                        onClick={() => {
                            dispatch(resetEmployee());
                            dispatch(
                                setOpen({
                                    ...open,
                                    modalUpdateHappening: false,
                                })
                            );
                        }}
                    >
                        Hủy
                    </Button>
                </div>
            }
        >
            <div className="h-screen overflow-y-scroll happening-scroll mt-5">
                <Row className="mt-7">
                    <Col
                        lg={8}
                        sm={24}
                        xs={24}
                        className="flex flex-col items-center"
                    >
                        <Image width={200} height={200} src={employee.image} />
                        <h1>{employee.name}</h1>
                        <b>{TeamStatus(employee.team)}</b>
                    </Col>
                    <Col lg={16} sm={24} xs={24}>
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
                                    <Input
                                        className="pointer-events-none"
                                        value={employee.name}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        className="pointer-events-none"
                                        value={employee.code}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        className="pointer-events-none"
                                        value={employee.phone}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>Email</Col>
                                <Col span={8}>CCCD/CMT</Col>
                                <Col span={8}>Ngày sinh</Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>
                                    <Input
                                        className="pointer-events-none"
                                        value={employee.email}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        className="pointer-events-none"
                                        value={
                                            employee.citizenIdentificationNumber
                                        }
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        className="pointer-events-none"
                                        value={
                                            employee.id &&
                                            format(
                                                new Date(employee.dateOfBirth),
                                                "dd/MM/yyyy"
                                            )
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <div className="mt-10 mb-20">
                    <Tabs
                        activeKey={activeKey}
                        onChange={(e) => {
                            setActiveKey(e);
                            handleGetSalaryByEmp();
                            handleGetProcessByEmp();
                            handleGetRecomentByEmp();
                            formSalary.resetFields();
                            formProcess.resetFields();
                            formRecoment.resetFields();
                        }}
                        items={items}
                    />
                </div>
            </div>
        </Modal>
    );
}
