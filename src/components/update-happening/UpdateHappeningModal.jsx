import { Button, Card, Col, Form, Image, Input, Modal, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import TabIncreaseSalary from "../increasesalary/TabIncreaseSalary";
import TabProcess from "../process/TabProcess";
import {
    getEmployeeById,
    getProcessByEmp,
    getProposalByEmp,
    getSalaryByEmp,
} from "../../services/api";
import TabRecommendation from "../proposal/TabRecommendation";
import { useDispatch, useSelector } from "react-redux";
import { resetEmployee, setOpen } from "../../redux/employee/employeeSlice";
import _ from "lodash";

export default function UpdateHappeningModal({ employeeId }) {
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
    const [salary, setSalary] = useState([]);
    const [processs, setProcesss] = useState([]);
    const [recoments, setRecoments] = useState([]);
    const [employee, setEmployee] = useState({});

    const getEmployee = async () => {
        const res = await getEmployeeById(employeeId);
        setEmployee(res?.data?.data);
    };
    const handleGetSalaryByEmp = async () => {
        try {
            const res = await getSalaryByEmp(employeeId);
            setSalary(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleGetProcessByEmp = async () => {
        try {
            const res = await getProcessByEmp(employeeId);
            setProcesss(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleGetRecomentByEmp = async () => {
        try {
            const res = await getProposalByEmp(employeeId);
            setRecoments(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const items = [
        {
            key: "1",
            label: `TĂNG LƯƠNG`,
            children: (
                <TabIncreaseSalary
                    handleGetSalaryByEmp={handleGetSalaryByEmp}
                    employee={employee}
                    salary={salary}
                />
            ),
        },
        {
            key: "2",
            label: `THĂNG CHỨC`,
            children: (
                <TabProcess
                    handleGetProcessByEmp={handleGetProcessByEmp}
                    employee={employee}
                    processs={processs}
                />
            ),
        },
        {
            key: "3",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: (
                <TabRecommendation
                    handleGetRecomentByEmp={handleGetRecomentByEmp}
                    employee={employee}
                    recoments={recoments}
                />
            ),
        },
    ];

    useEffect(() => {
        if (employeeId) {
            handleGetSalaryByEmp();
            handleGetProcessByEmp();
            handleGetRecomentByEmp();
            getEmployee();
        }
    }, [employeeId]);
    return (
        <>
            <Modal
                title="CẬP NHẬT DIỄN BIẾN"
                centered
                open={open.modalUpdateHappening}
                width={1300}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalUpdateHappening: false }));
                    dispatch(resetEmployee());
                }}
                footer={
                    <div className="text-center">
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => {
                                dispatch(setOpen({ ...open, modalEnd: true }));
                            }}
                        >
                            Kết thúc
                        </Button>
                        <Button
                            key="cancel"
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
                                        value={
                                            employee.id &&
                                            format(
                                                new Date(
                                                    employee.dateOfBirth
                                                ).getTime(),
                                                "yyyy/MM/dd"
                                            )
                                        }
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
        </>
    );
}
