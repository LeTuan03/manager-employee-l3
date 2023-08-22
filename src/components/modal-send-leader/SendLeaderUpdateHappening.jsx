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
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/employee/employeeSlice";
import { STATUS_EMPLOYEE } from "../../constants/constants";

const SendLeaderUpdateHappening = (props) => {
    const {
        openLeader,
        setOpenLeader,
        data,
        handleGetSalaryByEmp,
        handleGetProcessByEmp,
        handleGetRecomentByEmp,
        setIsModalOpen,
    } = props;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { employee } = useSelector((state) => state.employee);
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
        dispatch(setIsLoading(true));
        const { leaderId, submitContent } = values;
        const data = {
            ...employee,
            leaderId,
            submitContent,
        };
        await handleSendLeader(data);
        dispatch(setIsLoading(false));
        form.resetFields();
        setOpenLeader(false);
        setIsModalOpen(false);
        handleCancel();
    };
    const handleSendLeader = async (datas) => {
        const successMgs = "Trình lãnh đạo thành công";
        const newData = {
            ...data,
            leaderId: datas.leaderId,
            submitContent: datas.submitContent,
        };
        try {
            if (data.salaryIncreaseStatus) {
                newData.salaryIncreaseStatus = STATUS_EMPLOYEE.PENDING;
                await updateSalary(newData);
                await handleGetSalaryByEmp();
            } else if (data.processStatus) {
                newData.processStatus = STATUS_EMPLOYEE.PENDING;
                await updateProcess(newData);
                await handleGetProcessByEmp();
            } else if (newData.proposalStatus) {
                newData.proposalStatus = STATUS_EMPLOYEE.PENDING;
                await updateProposal(newData);
                await handleGetRecomentByEmp();
            }
            message.success(successMgs);
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
