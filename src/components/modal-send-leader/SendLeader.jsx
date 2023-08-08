import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { getAllLeader, updateEmployee } from "../../services/api";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";
import { STATUS, STATUS_EMPLOYEE } from "../../constants/constants";
import TextArea from "antd/es/input/TextArea";
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
const SendLeader = ({ reasonForEnding, setReasonForEnding }) => {
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
            submitContent: submitContent.trim(),
            submitProfileStatus,
            reasonForEnding: reasonForEnd.trim(),
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
                        getAllEmployee({
                            status: `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`,
                        })
                    );
                } else {
                    dispatch(
                        getAllEmployee({
                            status: `${BEEN_APPEOVED},${PROFILE_END_REQUEST},${ADDITIONAL_REQUIREMENTS_END_PROFILE},${REJECT_REQUEST_END_PROFILE}`,
                        })
                    );
                }
                setIdLeader({ id: null, label: "" });
                setReasonForEnding && setReasonForEnding("");
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
    function validateDate(_, value) {
        if (value) {
            const inputDateTime = new Date(value);
            const currentDateTime = new Date();
            if (inputDateTime > currentDateTime) {
                return Promise.reject(
                    new Error("Yêu cầu chọn trước ngày hôm nay")
                );
            }
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(`Vui lòng nhập ngày`));
        }
    }
    const handleCancel = () => {
        setIdLeader({ id: null, label: "" });
        dispatch(setOpen({ ...open, modalSendLeader: false }));
        form.resetFields();
        setLoading(false);
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
                    <div className="flex justify-center pb-5">
                        <Button
                            type="primary"
                            className="min-w-[100px] bg-green-600 hover:!bg-green-500"
                            loading={loading}
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            Trình lãnh đạo
                        </Button>
                        <Button
                            type="primary"
                            className="min-w-[100px]"
                            danger
                            onClick={() => handleCancel()}
                        >
                            Hủy
                        </Button>
                    </div>
                }
                onFinish={onFinish}
                onCancel={() => handleCancel()}
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
                                        validator: validateDate,
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
                                <TextArea
                                    maxLength={100}
                                    showCount
                                    autoSize={false}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default SendLeader;
