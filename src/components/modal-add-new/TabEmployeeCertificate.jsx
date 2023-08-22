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
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { MESSAGE_ERROR, REGEX, ROLE, STATUS } from "../../constants/constants";
import {
    createCertificate,
    deleteCertificate,
    getCertificateByEmployeeId,
    updateCertificate,
} from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import ModalDelete from "../ModalDelete";
import TextToTruncate from "../common/TextToTruncate";
import { setIsLoading } from "../../redux/employee/employeeSlice";
const TabEmployeeCertificate = ({ setCertificate, certificate }) => {
    const dispatch = useDispatch();
    const [formCertificate] = Form.useForm();
    const [id, setId] = useState(null);
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
        dispatch(setIsLoading(false));
        message.error("Đã có lỗi!");
    };
    const handleCreateCertificate = async (data) => {
        if (!_.isEmpty(employee)) {
            try {
                dispatch(setIsLoading(true));
                const res = await createCertificate(employee.id, [data]);
                if (res?.data?.code === STATUS.SUCCESS) {
                    await handleGetCertificateById();
                    formCertificate.resetFields();
                    message.success("Thêm thành công văn bằng");
                } else {
                    message.error(res?.data?.message);
                }
                dispatch(setIsLoading(false));
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
                dispatch(setIsLoading(true));
                const res = await updateCertificate(id, data);
                if (res?.data?.code === STATUS.SUCCESS) {
                    setId(null);
                    await handleGetCertificateById();
                    formCertificate.resetFields();
                    message.success("Sửa thành công văn bằng");
                } else {
                    message.error(res?.data?.message);
                }
                dispatch(setIsLoading(false));
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
    const handleDelete = async () => {
        if (idDelete) {
            try {
                dispatch(setIsLoading(true));
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
                dispatch(setIsLoading(false));
            } catch (error) {
                showFailded(error);
            }
        } else {
            const newList = certificate.filter((item) => item.uid !== uidDelete);
            setCertificate(newList);
            if (uidDelete === id) {
                setId(null);
                formCertificate.resetFields();
            }
            setUidDelete(null);
            message.success("Xóa thành công văn bằng");
        }
    }

    const handleGetCertificateById = async () => {
        try {
            dispatch(setIsLoading(true));
            const res = await getCertificateByEmployeeId(employee.id);
            if (res?.data?.code === STATUS.SUCCESS) {
                setCertificate(res?.data?.data);
            } else {
                message.error(res?.data?.message);
            }
            dispatch(setIsLoading(false));
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
    if (role !== ROLE.USER) {
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
                                {
                                    pattern:REGEX.NAME_CERTIFICATE,
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
                                    pattern:REGEX.FIELD,
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
                                    pattern: REGEX.DELETE_SPACE,
                                    message:MESSAGE_ERROR.DELETE_SPACE,
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
                    />
                </div>
            </ConfigProvider>
            {openDelete&&<ModalDelete
                handleDelete={handleDelete}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            ></ModalDelete>}
        </>
    );
};

export default TabEmployeeCertificate;
