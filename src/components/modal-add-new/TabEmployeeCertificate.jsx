import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    message,
    Row,
    Col,
    Button,
    Table,
    ConfigProvider,
    Empty,
} from "antd";
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
import TextToTruncate from "../common/TextToTruncate";
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
    const showFailded = (error) => {
        console.log(error);
        setLoading(false);
        message.error("Đã có lỗi!");
    };
    const handleCreateCertificate = async (data) => {
        if (!_.isEmpty(employee)) {
            try {
                setLoading(true);
                const res = await createCertificate(employee.id, [data]);
                if (res?.data?.code === STATUS.SUCCESS) {
                    await handleGetCertificateById();
                    formCertificate.resetFields();
                    message.success("Thêm thành công văn bằng");
                } else {
                    message.error(res?.data?.message);
                }
                setLoading(false);
            } catch (error) {
                showFailded(error);
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
                setLoading(true);
                const res = await updateCertificate(id, data);
                if (res?.data?.code === STATUS.SUCCESS) {
                    setId(null);
                    await handleGetCertificateById();
                    formCertificate.resetFields();
                    message.success("Sửa thành công văn bằng");
                } else {
                    message.error(res?.data?.message);
                }
                setLoading(false);
            } catch (error) {
                showFailded(error);
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
            setLoading(true);
            const res = await deleteCertificate(idDelete);
            if (res?.data?.code === STATUS.SUCCESS) {
                await handleGetCertificateById();
                message.success("Xóa thành công văn bằng");
                setIdDelete(null);
                if (idDelete === id) {
                    setId(null);
                    formCertificate.resetFields();
                }
            } else {
                message.error(res?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            showFailded(error);
        }
    };
    const handleDeleteByUid = (uid) => {
        const newList = certificate.filter((item) => item.uid !== uid);
        setCertificate(newList);
        setUidDelete(null);
        if (uid === id) {
            setId(null);
            formCertificate.resetFields();
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
                message.error(res?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            showFailded(error);
        }
    };
    useEffect(() => {
        setCertificate(employee.certificatesDto);
        return () => {
            setId(null);
            formCertificate.resetFields();
        };
    }, [employee]);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            align: "center",
            key: "stt",
            className: "!min-w-[60px]",
            render: (_, item, index) => <b>{index + 1}</b>,
        },
        {
            title: "Thao tác",
            align: "center",
            width: 90,
            render: (_, item) => (
                <div className="flex justify-center gap-3">
                    <>
                        <span
                            onClick={() => {
                                item.id
                                    ? setIdDelete(item.id)
                                    : setUidDelete(item.uid);
                                setOpenDelete(true);
                            }}
                            className="cursor-pointer"
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            onClick={() => {
                                formCertificate.setFieldsValue({
                                    ...item,
                                    issueDate: format(
                                        new Date(item.issueDate),
                                        "yyyy-MM-dd"
                                    ),
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
            width: 200,
            render: (certificateName) => (
                <>{TextToTruncate(certificateName, 26)}</>
            ),
        },
        {
            title: "Nội dung văn bằng",
            dataIndex: "content",
            key: "content",
            align: "center",
            className: "min-w-[200px]",
            render: (content) => <p className="text-left">{content}</p>,
        },
        {
            title: "Ngày cấp",
            dataIndex: "issueDate",
            key: "issueDate",
            align: "center",
            render: (issueDate) => (
                <>{issueDate && format(new Date(issueDate), "dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            align: "center",
            render: (field) => <p className="text-left">{field}</p>,
        },
    ];
    if (role !== 4) {
        columns.splice(1, 1);
    }
    return (
        <>
            <Form
                disabled={loading}
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
                                {
                                    pattern:
                                        /^(?!.* {2})[^!@#$%^&*()+.=,_-]{2,}$/g,
                                    message: "Tên sai định dạng",
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
                                {
                                    pattern:
                                        /^(?!.* {2})[^\d!@#$%^&*()+.=_]{2,}$/g,
                                    message: "Sai định dạng",
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
                                {
                                    pattern: /^(?!.* {2})\S+(?: \S+)*$/,
                                    message:
                                        "Không để khoảng trắng ở đầu, cuối và quá nhiều khoảng trắng liên tiếp",
                                },
                            ]}
                        >
                            <Input maxLength={200} showCount />
                        </Form.Item>
                    </Col>
                    <Col lg={4} span={24}>
                        <Form.Item label=" ">
                            <div className="flex justify-center items-center gap-2">
                                <Button
                                    className=" w-[100px]"
                                    loading={loading}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    {id ? "Lưu" : "Thêm"}
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    htmlType="button"
                                    onClick={() => {
                                        formCertificate.resetFields();
                                        setId(null);
                                    }}
                                >
                                    Đặt lại
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <ConfigProvider
                renderEmpty={() => (
                    <>
                        <Empty description={false} />
                    </>
                )}
            >
                <div className="main-table">
                    <Table
                        scroll={{ x: true, y: 200 }}
                        bordered
                        dataSource={certificate}
                        columns={columns}
                        pagination={false}
                        loading={loading}
                    />
                </div>
            </ConfigProvider>
            <ModalDelete
                loading={loading}
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
