import React, { useEffect, useState } from "react";
import { Form, Input, message, Row, Col, Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import _ from "lodash";
import { STATUS } from "../../constants/constants";
import {
    createCertificate,
    deleteCertificate,
    getCertificateByEmployeeId,
    updateCertificate,
} from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import ModalDelete from "../ModalDelete";
const TabEmployeeCertificate = ({ setCertificate, certificate }) => {
    const [formCertificate] = Form.useForm();
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { role } = useSelector((state) => state.account);
    const { employee } = useSelector((state) => state.employee);
    const [openDelete, setOpenDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [uidDelete, setUidDelete] = useState(null);
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
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const handleCreateCertificate = async (data) => {
        if (!_.isEmpty(employee)) {
            try {
                setLoading(true)
                const res = await createCertificate(employee.id, [data]);
                if (res?.status === STATUS.SUCCESS) {
                    setCertificate(res?.data?.data);
                    formCertificate.resetFields();
                    message.success("Thêm thành công văn bằng");
                } else {
                    message.error(res?.data?.message)
                }
                setLoading(false);
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
        const cloneCertificate = _.cloneDeep(certificate);
        const index = cloneCertificate.findIndex((item) => item.uid === id);
        if (index === -1) {
            try {
                setLoading(true)
                const res = await updateCertificate(id, data);
                if (res?.data?.code === STATUS.SUCCESS) {
                    setId(null);
                    handleGetCertificateById();
                    formCertificate.resetFields();
                    message.success("Sửa thành công văn bằng");
                } else {
                    message.error(res?.data?.message)
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            cloneCertificate[index] = data;
            setCertificate(cloneCertificate);
            setId(null);
            formCertificate.resetFields();
            message.success("Sửa thành công văn bằng");
        }
    };
    const handleDeleteCertificate = async (idDelete) => {
        try {
            setLoading(true)
            const res = await deleteCertificate(idDelete);
            if (res?.data?.code === STATUS.SUCCESS) {
                handleGetCertificateById();
                message.success("Xóa thành công văn bằng");
                setIdDelete(null)
                if (idDelete === id) {
                    setId(null)
                    formCertificate.resetFields()
                }
            } else {
                message.error(res?.data?.message)
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteByUid = (uid) => {
        const newList = certificate.filter((item) => item.uid !== uid);
        setCertificate(newList);
        setUidDelete(null)
        if (uid === id) {
            setId(null)
            formCertificate.resetFields()
        }
        message.success("Xóa thành công văn bằng");
    };
    const handleGetCertificateById = async () => {
        try {
            setLoading(true);
            const res = await getCertificateByEmployeeId(employee.id);
            if (res?.data?.code === STATUS.SUCCESS) {
                setCertificate(res?.data?.data);
                setLoading(false);
            } else {
                message.error(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setCertificate(employee.certificatesDto);
        return () => {
            setId(null)
            formCertificate.resetFields();
        };
    }, [employee]);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            align: "center",
            key: "stt",
            width: 60,
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Thao tác",
            align: "center",
            width: 100,
            render: (_, item) => (
                <div className="flex justify-center gap-3">
                    <>
                        <span
                            onClick={() => {
                                item.id
                                    ? setIdDelete(item.id)
                                    : setUidDelete(item.uid);
                                setOpenDelete(true)
                            }}
                            className="cursor-pointer"
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            onClick={() => {
                                formCertificate.setFieldsValue({
                                    ...item,
                                    issueDate: format(new Date(item.issueDate), "yyyy-MM-dd"),
                                });
                                setId(item.id || item.uid);
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
            className: "max-w-xs",
        },
        {
            title: "Nội dung văn bằng",
            dataIndex: "content",
            key: "content",
            className: "max-w-lg"
        },
        {
            title: "Ngày cấp",
            dataIndex: "issueDate",
            key: "issueDate",
            align: "center",
            width: 100,
            render: (issueDate) => (
                <>{issueDate && format(new Date(issueDate), "dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            align: "center",
            width: 100,
            className: "max-w-[200px]"
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
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="issueDate"
                            label="Ngày cấp"
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
                    <Col span={9}>
                        <Form.Item
                            name="field"
                            label="Lĩnh vực"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn cần nhập trường này",
                                },
                            ]}
                        >
                            <Input maxLength={50} showCount />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col lg={20} span={24}>
                        <Form.Item
                            name="content"
                            label="Nội dung văn bằng"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn cần nhập trường này",
                                },
                            ]}
                        >
                            <Input maxLength={200} showCount />
                        </Form.Item>
                    </Col>
                    <Col
                        className="flex justify-center items-center gap-2"
                        lg={4}
                        span={24}
                    >
                        <Button loading={loading} type="primary" htmlType="submit">
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
                scroll={{ x: true, y: 200 }}
                bordered
                dataSource={certificate}
                columns={columns}
                pagination={false}
                loading={loading}
            />
            <ModalDelete
                handleDeleteById={handleDeleteCertificate}
                handleDeleteByUid={handleDeleteByUid}
                uidDelete={uidDelete}
                idDelete={idDelete}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            ></ModalDelete>
        </>
    );
};

export default TabEmployeeCertificate;
