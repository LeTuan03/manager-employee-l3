import React, { useEffect, useState } from "react";
import { Form, Input, message, Row, Col, Button, Table, Select } from "antd";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    createFamily,
    deleteFamily,
    getFamilyByEmployeeId,
    updateFamily,
} from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { STATUS } from "../../constants/constants";
import { useSelector } from "react-redux";
const TabEmployeeFamily = ({ setFamily, family }) => {
    const [formFamily] = Form.useForm();
    const [update, setUpdate] = useState(null);
    const {employee } = useSelector((state) => state.employee)
    const onFinish = async (values) => {
        const {
            email,
            name,
            citizenIdentificationNumber,
            dateOfBirth,
            relationShip,
            gender,
            phoneNumber,
            address,
        } = values;
        const data = {
            uid: uuidv4(),
            email,
            name,
            citizenIdentificationNumber,
            dateOfBirth,
            gender,
            relationShip,
            phoneNumber,
            address,
            employeeId: employee.id,
        };
        if (update) {
            await handleUpdateFamily(data);
        } else {
            await handleCreateFamily(data);
        }
        console.log(data);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        setFamily(employee.employeeFamilyDtos);
        return () => {
            formFamily.resetFields();
        };
    }, [employee]);
    const handleGetFamily = async () => {
        try {
            const res = await getFamilyByEmployeeId(employee.id);
            if (res?.data?.code === STATUS.SUCCESS) {
                setFamily(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteFamily = async (id) => {
        try {
            const res = await deleteFamily(id);
            if (res?.data?.code === STATUS.SUCCESS) {
                message.success("Xóa thành công");
                await handleGetFamily();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteByUid = (uid) => {
        const newList = family.filter((item) => item.uid !== uid);
        setFamily(newList);
        message.success("Xóa thành công văn bằng");
    };
    const handleCreateFamily = async (data) => {
        if (!_.isEmpty(employee)) {
            try {
                const res = await createFamily(employee.id, [data]);
                if (res?.data?.code === STATUS.SUCCESS) {
                    setFamily(res?.data?.data);
                    message.success("Thêm thành công");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            if (_.isEmpty(family)) {
                setFamily([data]);
            } else {
                setFamily([data, ...family]);
            }
            message.success("Thêm thành công văn bằng");
            formFamily.resetFields();
        }
    };
    const handleUpdateFamily = async (data) => {
        const cloneFamily = _.cloneDeep(family);
        const index = cloneFamily.findIndex((item) => item.uid === update);
        if (index === -1) {
            try {
                const res = await updateFamily(update, data);
                if (res?.data?.code) {
                    await handleGetFamily();
                    formFamily.resetFields();
                    message.success("Sửa thành công");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            cloneFamily[index] = data;
            setFamily(cloneFamily);
            setUpdate(null);
            formFamily.resetFields();
            message.success("Sửa thành công văn bằng");
        }
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
                            onClick={() => {
                                family.id
                                    ? handleDeleteFamily(family.id)
                                    : handleDeleteByUid(family.uid);
                            }}
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            onClick={() => {
                                formFamily.setFieldsValue({
                                    ...family,
                                    dateOfBirth: format(
                                        new Date(family.dateOfBirth),
                                        "yyyy-MM-dd"
                                    ),
                                });
                                setUpdate(family.id || family.uid);
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
                className="mb-4"
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
                    <Col md={5} span={12}>
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
                    <Col md={5} span={12}>
                        <Form.Item
                            name="citizenIdentificationNumber"
                            label="Số CCCD/CMT"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số CCCD/CMT!",
                                },
                                {
                                    min: 9,
                                    max: 12,
                                    message: "CMT phải là 9 số, CCCD phải là 12 số!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={5} span={8}>
                        <Form.Item name="dateOfBirth" label="Ngày sinh">
                            <Input type="date"></Input>
                        </Form.Item>
                    </Col>
                    <Col md={5} span={8}>
                        <Form.Item name="relationShip" label="Quan hệ">
                            <Select
                                options={[
                                    {
                                        value: 1,
                                        label: "Con",
                                    },
                                    {
                                        value: 2,
                                        label: "Bố/Mẹ",
                                    },
                                    {
                                        value: 3,
                                        label: "Anh/Chị/Em",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} span={8}>
                        <Form.Item name="gender" label="Giới tính">
                            <Select
                                options={[
                                    {
                                        value: 0,
                                        label: "Nam",
                                    },
                                    {
                                        value: 1,
                                        label: "Nữ",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col md={6} span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email!",
                                },
                                {
                                    type: "email",
                                    message: "Định dạng email chưa đúng!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={12}>
                        <Form.Item
                            name="phoneNumber"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                                {
                                    pattern: /^0\d{9}$/,
                                    message: "Định dạng số điện thoại chưa đúng",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item name="address" label="Địa chỉ cụ thể">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        className="flex justify-center items-center gap-2"
                        md={4}
                        span={24}
                    >
                        <Button type="primary" htmlType="submit">
                            {update ? "Sửa" : "Thêm"}
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={() => {
                                formFamily.resetFields();
                                setUpdate(null);
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
