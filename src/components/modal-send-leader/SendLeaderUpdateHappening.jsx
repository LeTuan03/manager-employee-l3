import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import {
    getAllLeader,
    updateProcess,
    updateProposal,
    updateSalary,
} from "../../services/api";
import TextArea from "antd/es/input/TextArea";
import validateCodeInput from "../common/ValidateCodeInput";
import { useSelector } from "react-redux";

const SendLeaderUpdateHappening = (props) => {
    const {
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
    const { employee } = useSelector((state) => state.employee);
    const [loading, setLoading] = useState(false);
    const [nameLeader, setNameLeader] = useState([]);
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

    const onFinish = async (values) => {
        setLoading(true);
        const { leaderId } = values;
        const data = {
            ...employee,
            leaderId,
        };
        await handleSendLeader(data);
        setLoading(false);
        form.resetFields();
        setOpenLeader(false);
        setIsModalOpen(false);
    };
    const handleSendLeader = async (datas) => {
        const successMgs = "Trình lãnh đạo thành công";
        try {
            data.leaderId = datas.leaderId;
            if (type === "salary") {
                data.salaryIncreaseStatus = "2";
                await updateSalary(data);
                await handleGetSalaryByEmp();
                message.success(successMgs);
            } else if (type === "process") {
                data.processStatus = "2";
                await updateProcess(data);
                await handleGetProcessByEmp();
                message.success(successMgs);
            } else if (type === "recoment") {
                data.proposalStatus = "2";
                await updateProposal(data);
                await handleGetRecomentByEmp();
                message.success(successMgs);
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
    const handleCancel = () => {
        setIdLeader({ id: null, label: "" });
        form.resetFields();
        setOpenLeader(false);
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
                onCancel={() => handleCancel()}
                onOk={() => handleCancel()}
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
                                        validator: validateCodeInput,
                                    },
                                ]}
                            >
                                <TextArea maxLength={100} showCount />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col span={24}>
                            <Form.Item className="text-center">
                                <Button
                                    loading={loading}
                                    htmlType="submit"
                                    type="primary"
                                    className="mr-2 bg-green-600 hover:!bg-green-500"
                                >
                                    Trình lãnh đạo
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    className="min-w-[100px]"
                                    onClick={() => handleCancel()}
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

export default SendLeaderUpdateHappening;
