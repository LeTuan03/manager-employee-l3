import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    message,
    Row,
    Col,
    Button,
    Table,
    DatePicker,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
const TabAddCertificate = () => {
    const [formCertificate] = Form.useForm();
    const [certificate, setCertificate] = useState([]);
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        const { certificateName, field, content } = values;
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
            render: (_, item) => (
                <div className="flex justify-center gap-3">
                    <>
                        <span
                            // onClick={() => {
                            //     handleDeleteCertificate(item.id);
                            // }}
                            className="cursor-pointer"
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            // onClick={() => {
                            //     formCertificate.setFieldsValue({
                            //         ...item,
                            //         issueDate: moment(item.issueDate).format(),
                            //     });
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
            title: "Tên văn bằng",
            dataIndex: "certificateName",
            key: "certificateName",
            align: "center",
        },
        {
            title: "Nội dung văn bằng",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Ngày cấp",
            dataIndex: "issueDate",
            key: "issueDate",
            align: "center",
            render: (issueDate) => <>{format(new Date(issueDate), "dd/MM/yyyy")}</>,
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            align: "center",
        },
    ];
    return (
        <>
            <Form
                layout={"vertical"}
                name="basic"
                form={formCertificate}
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={15}>
                    <Col span={9}>
                        <Form.Item
                            label="Tên văn bằng"
                            name="certificateName"
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
                    <Col span={6}>
                        <Form.Item
                            name="issueDate"
                            label="Ngày cấp"
                        >
                            <DatePicker className="w-full" format="YYYY-MM-DD" clearIcon />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item name="field" label="Lĩnh vực">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col span={20}>
                        <Form.Item name="content" label="Nội dung văn bằng">
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
                                formCertificate.resetFields();
                                setId(null)
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
                dataSource={certificate}
                columns={columns}
                pagination={false}
                loading={loading}
            />
            ;
        </>
    );
};

export default TabAddCertificate;