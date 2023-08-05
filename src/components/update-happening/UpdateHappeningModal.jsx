import { Button, Card, Col, Image, Input, Modal, Row, Tabs } from "antd";
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
import { TEAM } from "../../constants/constants";

export default function UpdateHappeningModal({ employeeId }) {
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
    const [salary, setSalary] = useState([]);
    const [processs, setProcesss] = useState([]);
    const [recoments, setRecoments] = useState([]);
    const [employee, setEmployee] = useState({});
    const [activeKey, setActiveKey] = useState("1");

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

    const getTeam = (team) => {
        switch (team) {
            case TEAM.FE:
                return "Front-end";
            case TEAM.BE:
                return "Back-end";
            default:
                return "Tester";
        }
    };

    return (
        <>
            <Modal
                zIndex={3}
                title={
                    <p className="fixed top-0 z-10 py-2 w-[80%] bg-white">
                        CẬP NHẬT DIỄN BIẾN
                    </p>
                }
                centered
                open={open.modalUpdateHappening}
                width="84%"
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalUpdateHappening: false }));
                    dispatch(resetEmployee());
                    setActiveKey("1");
                }}
                footer={
                    <div
                        className="text-center bg-white fixed bottom-0 w-[84%] py-5"
                        style={{
                            width: "80%",
                            transform: "translateX(0)",
                        }}
                    >
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
                <div className="h-full overflow-y-scroll happening-scroll mt-5">
                    <Row className="mt-7">
                        <Col span={8} className="flex flex-col items-center">
                            <Image
                                width={200}
                                height={200}
                                src={employee.image}
                            />
                            <h1>{employee.name}</h1>
                            <b>{getTeam(employee.currentPosition)}</b>
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
                    <div className="mt-10 mb-20">
                        <Tabs
                            activeKey={activeKey}
                            onChange={(e) => setActiveKey(e)}
                            items={items}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
