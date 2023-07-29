import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table, message } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import {
    addProcessByEmp,
    deleteProcess,
    updateProcess,
} from "../../services/api";
import ProcessModal from "./ProcessModal";

const TabProcess = ({ processs, employee,handleGetProcessByEmp }) => {
    console.log(employee)
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Ngày thăng chức",
            dataIndex: "promotionDay",
            key: "promotionDay",
            render: (_, { promotionDay }) => (
                <a>{format(new Date(promotionDay).getTime(), "yyyy/MM/dd")}</a>
            ),
        },
        {
            title: "Lần thứ",
            dataIndex: "times",
            key: "times",
        },
        {
            title: "Chức vụ cũ",
            dataIndex: "currentPosition",
            key: "currentPosition",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Trạng thái",
            dataIndex: "processStatus",
            key: "processStatus",
            render: (processStatus) => {
                switch (processStatus) {
                    case "0":
                        processStatus = "Nộp lưu hồ sơ";
                        break;
                    case "1":
                        processStatus = "Lưu mới";
                        break;
                    case "2":
                        processStatus = "Chờ xử lí";
                        break;
                    case "3":
                        processStatus = "Đã được chấp nhận";
                        break;
                    case "4":
                        processStatus = "Yêu cầu bổ sung";
                        break;
                    case "5":
                        processStatus = "Từ chối";
                        break;
                    case "6":
                        processStatus = "Gửi yêu cầu kết thúc hồ sơ";
                        break;
                    case "7":
                        processStatus = "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case "8":
                        processStatus =
                            "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ";
                        break;
                    case "9":
                        processStatus = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        processStatus = "Chờ xử lí";
                        break;
                }
                return <a>{processStatus}</a>;
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: (_, employee) => (
                <div>
                    {employee.processStatus === "1" ? (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        employee.promotionDay = format(
                                            new Date(
                                                employee.promotionDay
                                            ).getTime(),
                                            "yyyy-MM-dd"
                                        );
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() =>
                                        handleDeletePromote(employee.id)
                                    }
                                />
                            </span>
                        </div>
                    ) : (
                        <div>
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setData(employee);
                                }}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [present, setPresent] = useState(false);

    const handleDeletePromote = async (id) => {
        try {
            const res = await deleteProcess(id);
            console.log(res)
            handleGetProcessByEmp()
            // message.success("Xóa thành công !");
        } catch (error) {
            message.error("Xóa thất bại !");
        }
    };

    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateProcess(value);
                console.log(res)
                message.success("Cập nhật thành công !");
            } else {
                const res = await addProcessByEmp(employee?.id, [
                    value,
                ]);
                console.log(res)
                message.success("Thêm mới thành công !");
            }
            handleGetProcessByEmp()
            handleOpenPresent();
            form.resetFields();
        } catch (error) {
            message.error("Cập nhật thất bại !");
            console.log(error)
        }
    };

    const handleOpenPresent = () => {
        setIsModalOpen(true);
        setPresent(true);
    };

    return (
        <>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={16} className="mb-2">
                    <Col span={4} className="hidden">
                        <Form.Item name="id">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4} className="hidden">
                        <Form.Item name="processStatus">
                            <Input value={1} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="promotionDay"
                            label="Ngày thăng chức"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input name="promotionDay" type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="newPosition"
                            label="Chức vụ mới"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Select
                                className="w-full"
                                options={[
                                    {
                                        value: 2,
                                        label: "Giám đốc",
                                    },
                                    {
                                        value: 1,
                                        label: "Trưởng phòng",
                                    },
                                    {
                                        value: 3,
                                        label: "Quản lí",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                className="mr-5 w-full bg-green-700 text-white"
                                htmlType="submit"
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                danger
                                className="w-full"
                                onClick={() => form.resetFields()}
                            >
                                Đặt lại
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row className="mt-8">
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={processs}
                        pagination={false}
                    />
                </Col>
            </Row>
            <ProcessModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                present={present}
                setPresent={setPresent}
                employee={employee}
            />
        </>
    );
};

export default TabProcess;