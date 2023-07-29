import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    message,
    Row,
    Col,
    Button,
    Table,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import _ from "lodash"
import { STATUS } from '../../constants/constants'
import {
    createCertificate,
    deleteCertificate,
    getCertificateByEmployeeId,
    updateCertificate,
} from "../../services/api";
import { v4 as uuidv4 } from "uuid";
const TabEmployeeCertificate = ({ employee, setCertificate, certificate }) => {
    const [formCertificate] = Form.useForm();
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { role } = useSelector((state) => state.account);
    const onFinish = async (values) => {
        const { certificateName, field, content, issueDate } = values;
        const data = {
            uid: uuidv4(),
            certificateName,
            issueDate,
            field,
            content,
        };
        if (id) {
            await handleUpdateCertificate(data);
        } else {
            await handleCreateCertificate(data);
        }
        console.log("id", values?.test)
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const handleCreateCertificate = async (data) => {
        if (!_.isEmpty(employee)) {
            try {
                const res = await createCertificate(employee.id, [data]);
                if (res?.status === STATUS.SUCCESS) {
                    setCertificate(res?.data?.data);
                    formCertificate.resetFields();
                    message.success("Thêm thành công văn bằng");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            if (_.isEmpty(certificate)) {
                setCertificate([data]);
            } else {
                setCertificate([data, ...certificate]);
            }
            message.success("Thêm thành công văn bằng");
            formCertificate.resetFields();
        }
    };

    const handleUpdateCertificate = async (data) => {
        const cloneCertificate = _.cloneDeep(certificate)
        const index = cloneCertificate.findIndex(item => item.uid === id)
        if (index === -1) {
            try {
                const res = await updateCertificate(id, data);
                if (res?.data?.code === STATUS.SUCCESS) {
                    setId(null);
                    handleGetCertificateById();
                    formCertificate.resetFields()
                    message.success("Sửa thành công văn bằng");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            cloneCertificate[index] = data
            setCertificate(cloneCertificate)
            setId(null);
            formCertificate.resetFields()
            message.success("Sửa thành công văn bằng");
        }

    };
    const handleDeleteCertificate = async (id) => {
        try {
            const res = await deleteCertificate(id);
            if (res?.status === STATUS.SUCCESS) {
                handleGetCertificateById();
                message.success("Xóa thành công văn bằng");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteByUid = (uid) => {
        const newList = certificate.filter((item) => item.uid !== uid);
        setCertificate(newList);
        message.success("Xóa thành công văn bằng");
    };
    const handleGetCertificateById = async () => {
        try {
            setLoading(true);
            const res = await getCertificateByEmployeeId(employee.id);
            setCertificate(res?.data?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setCertificate(employee.certificatesDto);
        return () => {
            formCertificate.resetFields();
        };
    }, [employee]);
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
                            onClick={() => {
                                item.id ?
                                    handleDeleteCertificate(item.id)
                                    : handleDeleteByUid(item.uid);
                            }}
                            className="cursor-pointer"
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            onClick={() => {
                                formCertificate.setFieldsValue({ ...item, issueDate: format(new Date(item.issueDate), "yyyy-MM-dd") });
                                setId(item.id || item.uid)
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
            render: (issueDate) => <>{issueDate && format(new Date(issueDate), "dd/MM/yyyy")}</>,
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            align: "center",
        },
    ];
    if (role !== 4) {
        columns.splice(1, 1);
    }
    return (
        <>
            <Form
                className="mb-4"
                layout={"vertical"}
                name="basic"
                form={formCertificate}
                initialValues={{
                    remember: true,
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
                    <Form.Item
                        name="test"
                        hidden
                    >
                        <Input hidden />
                    </Form.Item>
                    <Col span={6}>
                        <Form.Item
                            name="issueDate"
                            label="Ngày cấp"
                        >
                            <Input type="date"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item name="field" label="Lĩnh vực">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Form.Item className="hidden" name="id">
                    <Input type="hidden" />
                </Form.Item> */}
                <Row gutter={15}>
                    <Col lg={20} span={24}>
                        <Form.Item name="content" label="Nội dung văn bằng">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="flex justify-center items-center gap-2" lg={4} span={24}>
                        <Button type="primary" htmlType="submit">
                            {id ? "Sửa" : "Thêm"}
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={() => {
                                formCertificate.resetFields();
                                setId(null);
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

export default TabEmployeeCertificate;
