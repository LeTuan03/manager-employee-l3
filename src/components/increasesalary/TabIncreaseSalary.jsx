import { useState } from "react";
import { format } from "date-fns";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { Col, Form, Input, Row, Table, Button, message } from "antd";
import { addSalaryByEmp, deleteSalary, updateSalary } from "../../services/api";
import TabSalary from "./TabSalary";
import ModalInfo from "../modal-update-happening/ModalInfo";

const TabIncreaseSalary = ({ salary, employee, handleGetSalaryByEmp }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [validate, setValidate] = useState(false);

    const handleDelete = async (value) => {
        try {
            const res = await deleteSalary(value);
            console.log(res);
            handleGetSalaryByEmp();
            message.success("Xóa thành công!");
        } catch (error) {
            message.error("Xóa thất bại!");
        }
    };

    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateSalary(value);
                message.success("Cập nhật thành công!");
                setData(res?.data?.data);
            } else {
                const res = await addSalaryByEmp(employee.id, [value]);
                message.success("Thêm mới thành công!");
                setData(res?.data?.data[0]);
            }
            handleGetSalaryByEmp();
            setIsModalOpen(true);
            form.resetFields();
        } catch (error) {
            console.log(error);
            message.error("Cập nhật thất bại!");
        }
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Ngày tăng lương",
            dataIndex: "startDate",
            key: "startDate",
            render: (text) => (
                <a>{format(new Date(text).getTime(), "yyyy/MM/dd")}</a>
            ),
        },
        {
            title: "Lần thứ",
            dataIndex: "times",
            key: "times",
        },
        {
            title: "Lương cũ",
            dataIndex: "oldSalary",
            key: "oldSalary",
        },
        {
            title: "Lương mới",
            dataIndex: "newSalary",
            key: "newSalary",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Lý do",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Trạng thái",
            dataIndex: "salaryIncreaseStatus",
            key: "salaryIncreaseStatus",
            render: (salaryIncreaseStatus) => {
                switch (salaryIncreaseStatus) {
                    case 0:
                        salaryIncreaseStatus = "Nộp lưu hồ sơ";
                        break;
                    case 1:
                        salaryIncreaseStatus = "Lưu mới";
                        break;
                    case 2:
                        salaryIncreaseStatus = "Chờ xử lí";
                        break;
                    case 3:
                        salaryIncreaseStatus = "Đã được chấp nhận";
                        break;
                    case 4:
                        salaryIncreaseStatus = "Yêu cầu bổ sung";
                        break;
                    case 5:
                        salaryIncreaseStatus = "Từ chối";
                        break;
                    case 6:
                        salaryIncreaseStatus = "Gửi yêu cầu kết thúc hồ sơ";
                        break;
                    case 7:
                        salaryIncreaseStatus =
                            "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case 8:
                        salaryIncreaseStatus =
                            "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ";
                        break;
                    case 9:
                        salaryIncreaseStatus = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        salaryIncreaseStatus = "Chờ xử lí";
                        break;
                }
                return <a>{salaryIncreaseStatus}</a>;
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: (_, employee) => (
                <div>
                    {employee.salaryIncreaseStatus === 1 && (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-2"
                                    onClick={() => {
                                        employee.startDate = format(
                                            new Date(
                                                employee.startDate
                                            ).getTime(),
                                            "yyyy-MM-dd"
                                        );
                                        setData(employee);
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>{" "}
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() => handleDelete(employee.id)}
                                />
                            </span>
                        </div>
                    )}
                    {employee.salaryIncreaseStatus === 2 && (
                        <div className="">
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setData(employee);
                                }}
                            />
                        </div>
                    )}
                    {employee.salaryIncreaseStatus === 4 && (
                        <div>
                            <ModalInfo message={employee} type="req" />{" "}
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg"
                                    onClick={() => {
                                        employee.startDate = format(
                                            new Date(
                                                employee.startDate
                                            ).getTime(),
                                            "yyyy-MM-dd"
                                        );
                                        setData(employee);
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                        </div>
                    )}
                    {employee.salaryIncreaseStatus === 5 && (
                        <div>
                            <ModalInfo message={employee} />{" "}
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg"
                                    onClick={() => {
                                        employee.startDate = format(
                                            new Date(
                                                employee.startDate
                                            ).getTime(),
                                            "yyyy-MM-dd"
                                        );
                                        setData(employee);
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={16} className="hidden">
                    <Col span={8}>
                        <Form.Item name={"id"}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="hidden">
                    <Col span={8}>
                        <Form.Item name={"salaryIncreaseStatus"}>
                            <Input value={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="startDate"
                            label="Ngày tăng lương"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="oldSalary"
                            label="Lương cũ"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input type="number" suffix="VND" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="newSalary"
                            label="Lương mới"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input type="number" suffix="VND" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} className="mb-2">
                    <Col span={9}>
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
                    <Col span={11}>
                        <Form.Item
                            name="reason"
                            label="Lý do"
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
                                className="w-full bg-green-700 text-white"
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
                        dataSource={salary}
                        pagination={false}
                    />
                </Col>
            </Row>
            <TabSalary
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                employee={employee}
                handleGetSalaryByEmp={handleGetSalaryByEmp}
            />
        </>
    );
};
export default TabIncreaseSalary;
