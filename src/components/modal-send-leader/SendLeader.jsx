import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { getAllLeader, updateEmployee } from "../../services/api";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    resetEmployee,
    setOpen,
} from "../../redux/employee/employeeSlice";
import { STATUS, STATUS_EMPLOYEE } from "../../constants/constants";
const {
    NEW_SAVE,
    PENDING,
    ADDITIONAL_REQUIREMENTS,
    REJECT,
    BEEN_APPEOVED,
    REJECT_REQUEST_END_PROFILE,
    PROFILE_END_REQUEST,
    ADDITIONAL_REQUIREMENTS_END_PROFILE,
} = STATUS_EMPLOYEE;
const SendLeader = ({ setEmployeeId, reasonForEnding, setReasonForEnding }) => {
    const [form] = Form.useForm();
    const [nameLeader, setNameLeader] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
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
        let reasonForEnd = "";
        if (reasonForEnding) {
            submitProfileStatus = "6";
            reasonForEnd = reasonForEnding;
        }
        const data = {
            ...employee,
            leaderId,
            submitDay,
            submitContent,
            submitProfileStatus,
            reasonForEnding: reasonForEnd,
        };
        await handleSendLeader(data);
    };
    const handleSendLeader = async (data) => {
        try {
            setLoading(true);
            const res = await updateEmployee(employee?.id, data);
            if (res?.data?.code === STATUS.SUCCESS) {
                if (res?.data?.data?.submitProfileStatus === "2") {
                    dispatch(
                        getAllEmployee(
                            `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`
                        )
                    );
                } else {
                    dispatch(
                        getAllEmployee(
                            `${BEEN_APPEOVED},${PROFILE_END_REQUEST},${ADDITIONAL_REQUIREMENTS_END_PROFILE},
                            ${REJECT_REQUEST_END_PROFILE}`
                        )
                    );
                }
                dispatch(resetEmployee());
                setIdLeader({ id: null, label: "" });
                setReasonForEnding && setReasonForEnding("");
                setEmployeeId(null);
                message.success("Trình lãnh đạo thành công");
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
                form.resetFields();
            } else {
                message.error(res?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
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
                zIndex={6}
                width={760}
                centered
                cancelText={"Hủy"}
                okText={"Trình lãnh đạo"}
                title="Trình lãnh đạo"
                open={open.modalSendLeader}
                onOk={() => {
                    form.submit();
                }}
                footer={
                    <div className="flex justify-center">
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(
                                    setOpen({ ...open, modalSendLeader: false })
                                );
                                form.resetFields();
                                setLoading(false);
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            Trình lãnh đạo
                        </Button>
                    </div>
                }
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
