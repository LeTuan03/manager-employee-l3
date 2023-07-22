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
import moment from "moment";
import { useSelector } from "react-redux";
import {
    createCertificate,
    deleteCertificate,
    getCertificateByEmployeeId,
    updateCertificate,
} from "../services/api";
const TabEmployeeCertificate = ({ employee }) => {
    const [formCertificate] = Form.useForm();
    const [id, setId] = useState(null);
    const [certificate, setCertificate] = useState([]);
    const [loading, setLoading] = useState(false);
    const { role } = useSelector((state) => state.account);
    const dateFormat = "YYYY-MM-DD";
    const today = moment();

    const [date, setDate] = useState(today);
    const [disabled, setdisabled] = useState(false);

    const onFinish = async (values) => {
        const { certificateName, field, content } = values;
        const data = {
            certificateName,
            issueDate: "2022-09-09",
            field,
            content,
        };
        if (id) {
            await handleUpdateCertificate(data);
        } else {
            await handleCreateCertificate([data]);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const handleCreateCertificate = async (data) => {
        try {
            const res = await createCertificate(employee.id, data);
            if (res?.status === 200) {
                setCertificate(res?.data?.data);
                formCertificate.resetFields();
                message.success("Thêm thành công văn bằng");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onCheckboxHandle = (e) => {
        if (e.target.checked) {
            setwarntill(moment("2090-10-10"));
            setdisabled(true);
        } else {
            setwarntill(today);
            setdisabled(false);
        }
    };
    const handleUpdateCertificate = async (data) => {
        try {
            const res = await updateCertificate(id, data);
            if (res?.data?.code === 200) {
                setId(null);
                handleGetCertificateById();
                message.success("Sửa thành công văn bằng");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteCertificate = async (id) => {
        try {
            const res = await deleteCertificate(id);
            console.log(res);
            if (res?.status === 200) {
                handleGetCertificateById();
                message.success("Xóa thành công văn bằng");
            }
        } catch (error) {
            console.log(error);
        }
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
                                handleDeleteCertificate(item.id);
                            }}
                            className="cursor-pointer"
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            onClick={() => {
                                formCertificate.setFieldsValue({
                                    ...item,
                                    issueDate: moment(item.issueDate).format(),
                                });
                                setId(item?.id);
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
            render: (issueDate) => (
                <>{format(new Date(issueDate), "dd/MM/yyyy")}</>
            ),
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
    // const init = {
    //     dateOfBirth: dayjs(),
    // };
    return (
        <>
            <Form
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
                    <Col span={6}>
                        <Form.Item
                            name="issueDate"
                            label="Ngày cấp"
                            getValueFromEvent={(onChange) =>
                                moment(onChange).format("YYYY-MM-DD")
                            }
                            // getValueProps={(i) => ({ value: moment(i) })}
                        >
                            <DatePicker
                                className="w-full"
                                defaultValue={moment()}
                                format={dateFormat}
                                onChange={(date, dateString) =>
                                    setwarntill(dateString)
                                }
                                value={warntill}
                                clearIcon
                            />
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
                    <Col span={20}>
                        <Form.Item name="content" label="Nội dung văn bằng">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        className="flex justify-center items-center gap-2"
                        span={4}
                    >
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
