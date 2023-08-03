import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import {
    getAllLeader,
    getEmployeeById,
    updateProcess,
    updateProposal,
    updateSalary,
} from "../../services/api";
import { format } from "date-fns";
import validateCodeInput from "../../hook/ValidateCodeInput";

const SendLeader2 = (props) => {
    const {
        employeeId,
        openLeader,
        setOpenLeader,
        data,
        type,
        handleGetSalaryByEmp,
        handleGetProcessByEmp,
        handleGetRecomentByEmp,
        setIsModalOpen,
    } = props;
    const [form] = Form.useForm();
    const [nameLeader, setNameLeader] = useState([]);
    const [employee, setEmployee] = useState({});
    const [idLeader, setIdLeader] = useState({ id: null, label: "" });

    const handleGetAllLeader = async () => {
        const res = await getAllLeader();
        if (res?.data?.code) {
            const data = res?.data?.data;
            const nameData = data.map((item) => {
                return {
                    value: item.id,
                    label: item.leaderName,
                };
            });
            setNameLeader(nameData);
        }
    };
    const getEmployee = async () => {
        if (employeeId !== null) {
            const res = await getEmployeeById(employeeId);
            setEmployee(res?.data?.data);
        }
    };
    useEffect(() => {
        getEmployee();
    }, [employeeId]);

    const onFinish = async (values) => {
        const { leaderId, appointmentDate, submitContent } = values;
        const data = {
            ...employee,
            leaderId,
        };
        await handleSendLeader(data);
        form.resetFields();
        setOpenLeader(false);
        setIsModalOpen(false);
    };
    const handleSendLeader = async (datas) => {
        try {
            data.leaderId = datas.leaderId;
            if (type === "salary") {
                data.salaryIncreaseStatus = "2";
                const res = await updateSalary(data);
                await handleGetSalaryByEmp();
                message.success("Trình lãnh đạo thành công");
            } else if (type === "process") {
                data.processStatus = "2";
                const res = await updateProcess(data);
                await handleGetProcessByEmp();
                message.success("Trình lãnh đạo thành công");
            } else if (type === "recoment") {
                data.proposalStatus = "2";
                const res = await updateProposal(data);
                await handleGetRecomentByEmp();
                message.success("Trình lãnh đạo thành công");
            }
        } catch (error) {
            console.log(error);
            message.error("Trình lãnh đạo thất bại!");
        }
    };
    const handleChange = (value) => {
        if (value === 1) {
            setIdLeader({ ...idLeader, label: "Giám đốc" });
        } else if (value === 2) {
            setIdLeader({ ...idLeader, label: "Trưởng phòng" });
        }
    };
    useEffect(() => {
        handleGetAllLeader();
    }, []);
    return (
        <>
            <Modal
                width={760}
                centered
                title="Trình lãnh đạo"
                open={openLeader}
                onCancel={() => {
                    setOpenLeader(false);
                    form.resetFields();
                    setIdLeader({ id: null, label: "" });
                }}
                footer={false}
            >
                <Form
                    layout={"vertical"}
                    form={form}
                    name="basic"
                    initialValues={{
                        remember: true,
                        submitDay: format(new Date(), "yyyy-MM-dd"),
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={15}>
                        <Col span={8}>
                            <Form.Item
                                label="Ngày trình"
                                name="submitDay"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bạn cần nhập trường này",
                                    },
                                ]}
                            >
                                <Input type="date"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="leaderId"
                                label="Tên lãnh đạo"
                                rules={[
                                    {
                                        required: "true",
                                        message: "Vui lòng chọn lãnh đạo!",
                                    },
                                ]}
                            >
                                <Select
                                    options={nameLeader}
                                    onChange={(value) => {
                                        handleChange(value);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Chức vụ">
                                <Select value={null}>
                                    <option value={idLeader.value}>
                                        {idLeader.label}
                                    </option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Nội dung"
                                name="submitContent"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bạn cần nhập trường này",
                                    },
                                    {
                                        validator: validateCodeInput,
                                        message:
                                            "Vui lòng nhập văn bản thuần túy, không phải nội dung giống như mã.",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item className="text-center">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="mr-2"
                                >
                                    Trình lãnh đạo
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => setOpenLeader(false)}
                                >
                                    Hủy
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default SendLeader2;
