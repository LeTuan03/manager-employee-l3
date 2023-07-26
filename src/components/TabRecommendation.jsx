import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table, message } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { deleteProposal, updateProposal } from "../services/api";
import RecomnentModal from "./RecomnentModal";

const TabRecommendation = ({ recoments, employee }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Ngày diễn biến",
            dataIndex: "proposalDate",
            key: "proposalDate",
            render: (_, { proposalDate }) => (
                <>{format(new Date(proposalDate).getTime(), "yyyy/MM/dd")}</>
            ),
        },
        {
            title: "Loại ",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },

        {
            title: "Mô tả chi tiết",
            dataIndex: "detailedDescription",
            key: "detailedDescription",
        },
        {
            title: "Trạng thái",
            dataIndex: "proposalStatus",
            key: "proposalStatus",
            render: (proposalStatus) => {
                switch (proposalStatus) {
                    case "0":
                        proposalStatus = "Nộp lưu hồ sơ";
                        break;
                    case "1":
                        proposalStatus = "Lưu mới";
                        break;
                    case "2":
                        proposalStatus = "Chờ xử lí";
                        break;
                    case "3":
                        proposalStatus = "Đã được chấp nhận";
                        break;
                    case "4":
                        proposalStatus = "Yêu cầu bổ sung";
                        break;
                    case "5":
                        proposalStatus = "Từ chối";
                        break;
                    case "6":
                        proposalStatus = "Gửi yêu cầu kết thúc hồ sơ";
                        break;
                    case "7":
                        proposalStatus = "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case "8":
                        proposalStatus =
                            "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ";
                        break;
                    case "9":
                        proposalStatus = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        proposalStatus = "Chờ xử lí";
                        break;
                }
                return <a>{proposalStatus}</a>;
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: (_, employee) => (
                <div>
                    {employee.proposalStatus === 1 ? (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() =>
                                        handleDeleteRecoment(employee.id)
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
    const [present, setPresent] = useState(false);
    const [data, setData] = useState({});

    const handleDeleteRecoment = async (id) => {
        try {
            const res = await deleteProposal(id);
            message.success("Xóa thành công!");
        } catch (error) {
            message.error("Xóa thất bại!");
        }
    };
    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateProposal(value);
                message.success("Cập nhật thành công!");
            } else {
                const res = await addProposalByEmp(recoments[0].employeeId, [
                    value,
                ]);
                message.success("Thêm mới thành công!");
            }
            handleOpenPresent();
            form.resetFields();
        } catch (error) {
            message.error(error);
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
                    <Col span={6} className="hidden">
                        <Form.Item name="id">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6} className="hidden">
                        <Form.Item name="proposalStatus">
                            <Input value={1} />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            name="proposalDate"
                            label="Ngày diễn biến"
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
                    <Col span={6}>
                        <Form.Item
                            name="type"
                            label="Loại"
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
                                        value: 1,
                                        label: "Đề xuất",
                                    },
                                    {
                                        value: 2,
                                        label: "Tham mưu",
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
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="content"
                            label="Nội dung"
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
                    <Col span={12}>
                        <Form.Item
                            name="detailedDescription"
                            label="Mô tả chi tiết"
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
                                className="mr-5 w-full  bg-green-700 text-white"
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
                        dataSource={recoments}
                        pagination={false}
                    />
                </Col>
            </Row>
            <RecomnentModal
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

export default TabRecommendation;
