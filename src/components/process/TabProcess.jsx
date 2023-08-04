import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table, message } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    addProcessByEmp,
    deleteProcess,
    updateProcess,
} from "../../services/api";
import ProcessModal from "./ProcessModal";
import ModalInfo from "../modal-update-happening/ModalInfo";
import useTruncateText from "../../hook/useTruncateText";
import validateCodeInput from "../../hook/ValidateCodeInput";
import { useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";

const TabProcess = ({ processs, employee, handleGetProcessByEmp }) => {
    const [form] = Form.useForm();
    const { open } = useSelector((state) => state.employee);
    useEffect(() => {
        if (!open.modalUpdateHappening) {
            form.resetFields();
        }
    }, [open.modalUpdateHappening]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(false);

    const handleDeletePromote = async (id) => {
        try {
            await deleteProcess(id);
            message.success("Xóa thành công !");
            handleGetProcessByEmp();
            form.resetFields();
        } catch (error) {
            message.error("Xóa thất bại !");
        }
    };

    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateProcess(value);
                setData(res?.data?.data);
                message.success("Cập nhật thành công !");
            } else {
                const res = await addProcessByEmp(employee?.id, [value]);
                setData(res?.data?.data[0]);
                message.success("Thêm mới thành công !");
            }
            handleGetProcessByEmp();
            setIsModalOpen(true);
            form.resetFields();
        } catch (error) {
            message.error("Cập nhật thất bại !");
            console.log(error);
        }
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 60,
            align: "center",
            render: (_, item, index) => <b>{index + 1}</b>,
        },
        {
            title: "Ngày thăng chức",
            dataIndex: "promotionDay",
            key: "promotionDay",
            width: 150,
            align: "center",
            render: (_, { promotionDay }) =>
                format(new Date(promotionDay).getTime(), "yyyy/MM/dd"),
        },
        {
            title: "Lần thứ",
            dataIndex: "times",
            key: "times",
            width: 90,
            align: "center",
        },
        {
            title: "Chức vụ cũ",
            dataIndex: "currentPosition",
            key: "currentPosition",
            width: 140,
            align: "center",
            render: (currentPosition) =>
                currentPosition === 0
                    ? "Giám đốc"
                    : currentPosition === 1
                    ? "Trưởng phòng"
                    : "Quản lí",
        },
        {
            title: "Chức vụ hiện tại",
            dataIndex: "newPosition",
            key: "newPosition",
            width: 140,
            align: "center",
            render: (newPosition) =>
                newPosition === 0
                    ? "Giám đốc"
                    : newPosition === 1
                    ? "Trưởng phòng"
                    : "Quản lí",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            render: (note) => useTruncateText(note || "", 40),
        },
        {
            title: "Trạng thái",
            dataIndex: "processStatus",
            key: "processStatus",
            width: 190,
            align: "center",
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
                        break;
                }
                return useTruncateText(processStatus || "", 13);
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            width: 130,
            align: "center",
            render: (_, employee) => (
                <div>
                    {employee.processStatus === "1" && (
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
                                        setData(employee);
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() => {
                                        setEmployeeIdToDelete(employee.id);
                                        setOpenDelete(true);
                                    }}
                                />
                            </span>
                        </div>
                    )}
                    {employee.processStatus === "2" && (
                        <div>
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setData(employee);
                                    setIsModalOpen(true);
                                }}
                            />
                        </div>
                    )}
                    {employee.processStatus === "3" && (
                        <div>
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setData(employee);
                                    setIsModalOpen(true);
                                }}
                            />
                        </div>
                    )}
                    {employee.processStatus === "4" && (
                        <div>
                            <ModalInfo type="req" message={employee} />
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg"
                                    onClick={() => {
                                        employee.promotionDay = format(
                                            new Date(
                                                employee.promotionDay
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
                    {employee.processStatus === "5" && (
                        <div>
                            <ModalInfo message={employee} />
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg"
                                    onClick={() => {
                                        employee.promotionDay = format(
                                            new Date(
                                                employee.promotionDay
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
                                        value: 0,
                                        label: "Giám đốc",
                                    },
                                    {
                                        value: 1,
                                        label: "Trưởng phòng",
                                    },
                                    {
                                        value: 2,
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
                                {
                                    max: 150,
                                    message: "Nội dung bạn nhập quá dài !",
                                },
                                {
                                    validator: validateCodeInput,
                                    message:
                                        "Vui lòng nhập văn bản thuần túy, không phải nội dung giống như mã.",
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                className="w-full bg-green-600 text-white hover:!text-white"
                                type="primary"
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
                employee={employee}
                handleGetProcessByEmp={handleGetProcessByEmp}
            />
            <ModalDelete
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                employeeIdToDelete={employeeIdToDelete}
                handleDeleteEmployee={handleDeletePromote}
            />
        </>
    );
};

export default TabProcess;
