import { Col, Form, Input, Modal, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { getAllLeader, updateEmployee } from "../../services/api";
import { format } from "date-fns";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    resetEmployee,
    setOpen,
} from "../../redux/employee/employeeSlice";

const SendLeader = (props) => {
    const [form] = Form.useForm();
    const [nameLeader, setNameLeader] = useState([]);
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
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
        const { leaderId, submitDay, submitContent } = values;
        let submitProfileStatus = "2";
        let reasonForEnding = "";
        if (props.reasonForEnding) {
            submitProfileStatus = "6";
            reasonForEnding = props.reasonForEnding;
        }
        const data = {
            ...employee,
            leaderId,
            submitDay,
            submitContent,
            submitProfileStatus,
            reasonForEnding,
        };
        await handleSendLeader(data);
    };
    const handleSendLeader = async (data) => {
        const res = await updateEmployee(employee?.id, data);
        if (res?.data?.code === 200) {
            dispatch(
                setOpen({
                    ...open,
                    modalSendLeader: false,
                    modalEnd: false,
                    modalProfile: false,
                    modalUpdateHappening: false,
                    modalInput: false,
                })
            );
            if (res?.data?.data?.submitProfileStatus === "2") {
                dispatch(getAllEmployee("1,2,4,5"));
            } else {
                dispatch(getAllEmployee("6,3,8,9"));
            }
            dispatch(resetEmployee());
            setIdLeader({ id: null, label: "" });
            props.setReasonForEnding("");
            message.success("Trình lãnh đạo thành công");
            form.resetFields();
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
                cancelText={"Hủy"}
                okText={"Trình lãnh đạo"}
                title="Trình lãnh đạo"
                open={open.modalSendLeader}
                onOk={() => {
                    form.submit();
                }}
                onFinish={onFinish}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalSendLeader: false }));
                }}
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
                            <Form.Item name="leaderId" label="Tên lãnh đạo">
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
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default SendLeader;
