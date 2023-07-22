import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, message, Row, Col, Avatar } from "antd";
const FormEmployee = ({ form, employee }) => {

    const onFinish = async (values) => {
        const { fullName, phone } = values;
        message.success("Sửa thành công" + " " + fullName)
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        form.setFieldsValue({
            name: employee.name,
            code: employee.code,
            gender: employee.gender,
            dateOfBirth: 942253200000,
            address: employee.address,
            team: employee.team,
            email: employee.email,
            image: employee.image,
            phone: employee.phone,
            citizenIdentificationNumber: employee.citizenIdentificationNumber,
            dateOfIssuanceCard: 942253200000,
            placeOfIssueCard: employee.placeOfIssueCard,
            ethnic: employee.ethnic,
            religion: employee.religion,
        })
    }, [employee])
    return (
        <>
            <Form
                layout={'vertical'}
                form={form}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col span={18}>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Tên nhân viên"
                                    name="name"
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
                            <Col span={8}>
                                <Form.Item
                                    name="code"
                                    label="Mã nhân viên"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="gender"
                                    label="Giới tính"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Ngày sinh"
                                    name="dateOfBirth"
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
                            <Col span={8}>
                                <Form.Item
                                    name="ethnic"
                                    label="Dân tộc"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="religion"
                                    label="Tôn giáo"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Số CCCD/CMT"
                                    name="citizenIdentificationNumber"
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
                            <Col span={8}>
                                <Form.Item
                                    name="dateOfIssuanceCard"
                                    label="Ngày cấp"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="placeOfIssueCard"
                                    label="Nơi cấp"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Email"
                                    name="email"
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
                            <Col span={8}>
                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="team"
                                    label="Nhóm"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Địa chỉ cụ thể"
                                    name="address"
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
                    </Col>
                    <Col className='flex justify-center items-start' span={6}>
                        <Avatar className='cursor-pointer' size={200} icon={<UserOutlined />} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default FormEmployee;