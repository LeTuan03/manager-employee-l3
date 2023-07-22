import React, { useEffect, useState } from "react";
import { Form, Input, message, Row, Col, Button, Table } from "antd";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TabAddFamily = () => {
    const [formFamily] = Form.useForm();
    const [family,setFamily]=useState([])
    const onFinish = async (values) => {
        const {
            email,
            name,
            citizenIdentificationNumber,
            dateOfBirth,
            relationShip,
            phoneNumber,
            address,
        } = values;
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            align: "center",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Thao tác",
            align: "center",
            render: (_, family) => (
                <div className="flex justify-center gap-3">
                    <>
                        <span
                            className="cursor-pointer"
                        // onClick={() => {
                        //     handleDeleteFamily(family.id);
                        // }}
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            // onClick={() => {
                            //     formFamily.setFieldsValue(family)
                            //     setUpdate(family.id)
                            // }}
                            className="cursor-pointer"
                        >
                            <EditOutlined className="text-blue-600 text-lg" />
                        </span>
                    </>
                </div>
            ),
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            render: (dateOfBirth) => (
                <>{format(new Date(dateOfBirth), "dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            render: (gender) => <>{gender === 1 ? "Nữ" : "Nam"}</>,
        },
        {
            title: "Quan hệ",
            dataIndex: "relationShip",
        },
        {
            title: "Số CCCD/CMT",
            dataIndex: "citizenIdentificationNumber",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
        },
    ];
    return (
        <>
            <Form
                layout={"vertical"}
                name="basic"
                form={formFamily}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={15}>
                    <Col span={5}>
                        <Form.Item
                            label="Họ và tên người thân"
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
                    <Col span={5}>
                        <Form.Item name="citizenIdentificationNumber" label="Số CCCD/CMT">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="dateOfBirth" label="Ngày sinh">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="relationShip" label="Quan hệ">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="gender" label="Giới tính">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6}>
                        <Form.Item name="email" label="Email">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="phoneNumber" label="Số điện thoại">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="address" label="Địa chỉ cụ thể">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="flex justify-center items-center gap-2" span={4}>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={() => {
                                formFamily.resetFields();
                            }}
                        >
                            Đặt lại
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table
                scroll={{ y: 200 }}
                bordered
                dataSource={family}
                columns={columns}
                pagination={false}
            />
            ;
        </>
    );
};

export default TabAddFamily;