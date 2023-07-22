import React, { useEffect, useState } from "react";
import { Form, Input, message, Row, Col, Button, Table } from "antd";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { createFamily, deleteFamily, getFamilyByEmployeeId, updateFamily } from "../services/api";
const TabEmployeeFamily = ({ employee }) => {
    const [formFamily] = Form.useForm();
    const [update, setUpdate] = useState(null)
    const [family, setFamily] = useState([]);
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
        const data = {
            email,
            name,
            citizenIdentificationNumber,
            dateOfBirth,
            relationShip,
            phoneNumber,
            address,
            employeeId: employee.id
        }
        if (update) {
            await handleUpdateFamily(data)
        } else {
            await handleCreateFamily(data)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        setFamily(employee.employeeFamilyDtos);
    }, [employee]);
    const handleGetFamily = async () => {
        try {
            const res = await getFamilyByEmployeeId(employee.id);
            if (res?.data?.code === 200) {
                setFamily(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteFamily = async (id) => {
        try {
            const res = await deleteFamily(id);
            if (res?.data?.code === 200) {
                message.success("Xóa thành công");
                await handleGetFamily();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleCreateFamily = async (data) => {
        try {
            const res = await createFamily(employee.id, [data])
            // console.log(res)
            if (res?.data?.code===200) {
                setFamily(res?.data?.data)
                message.success("Thêm thành công")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdateFamily =async (data) => {
        try {
            const res = await updateFamily(update, data)
            console.log(res)
            if (res?.data?.code) {
                await handleGetFamily();
                formFamily.resetFields()
                message.success("Sửa thành công")
            }
        } catch (error) {
            console.log(error)
        }
    }
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
                            onClick={() => {
                                handleDeleteFamily(family.id);
                            }}
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            onClick={() => {
                                formFamily.setFieldsValue(family)
                                setUpdate(family.id)
                            }}
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
                                setUpdate(null)
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

export default TabEmployeeFamily;
