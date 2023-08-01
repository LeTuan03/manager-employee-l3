import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table, message } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import {
    addProposalByEmp,
    deleteProposal,
    updateProposal,
} from "../../services/api";
import RecomnentModal from "./RecomnentModal";
import ModalInfo from "../modal-update-happening/ModalInfo";

const TabRecommendation = ({ recoments, employee, handleGetRecomentByEmp }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState({});

    const handleDeleteRecoment = async (id) => {
        try {
            const res = await deleteProposal(id);
            message.success("Xóa thành công!");
            handleGetRecomentByEmp();
        } catch (error) {
            message.error("Xóa thất bại!");
        }
    };
    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateProposal(value);
                setData(res?.data?.data);
                message.success("Cập nhật thành công!");
            } else {
                const res = await addProposalByEmp(employee?.id, [value]);
                setData(res?.data?.data[0]);
                message.success("Thêm mới thành công!");
            }
            handleGetRecomentByEmp();
            setIsModalOpen(true);
            form.resetFields();
        } catch (error) {
            // message.error(error);
            console.log(error);
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
            title: "Ngày diễn biến",
            dataIndex: "proposalDate",
            key: "proposalDate",
            render: (_, { proposalDate }) => (
                <a>{format(new Date(proposalDate).getTime(), "yyyy/MM/dd")}</a>
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
                    case 0:
                        proposalStatus = "Nộp lưu hồ sơ";
                        break;
                    case 1:
                        proposalStatus = "Lưu mới";
                        break;
                    case 2:
                        proposalStatus = "Chờ xử lí";
                        break;
                    case 3:
                        proposalStatus = "Đã được chấp nhận";
                        break;
                    case 4:
                        proposalStatus = "Yêu cầu bổ sung";
                        break;
                    case 5:
                        proposalStatus = "Từ chối";
                        break;
                    case 6:
                        proposalStatus = "Gửi yêu cầu kết thúc hồ sơ";
                        break;
                    case 7:
                        proposalStatus = "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case 8:
                        proposalStatus =
                            "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ";
                        break;
                    case 9:
                        proposalStatus = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
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
                    {employee.proposalStatus === 1 && (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        employee.proposalDate = format(
                                            new Date(
                                                employee.proposalDate
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
                                    onClick={() =>
                                        handleDeleteRecoment(employee.id)
                                    }
                                />
                            </span>
                        </div>
                    )}
                    {employee.proposalStatus === 2 && (
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
                    {employee.proposalStatus === 4 && (
                        <div>
                            <ModalInfo type="req" message={employee} />
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg ml-5"
                                    onClick={() => {
                                        employee.proposalDate = format(
                                            new Date(
                                                employee.proposalDate
                                            ).getTime(),
                                            "yyyy-MM-dd"
                                        );
                                        console.log(employee);
                                        setData(employee);
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                        </div>
                    )}
                    {employee.proposalStatus === 5 && (
                        <div>
                            <ModalInfo message={employee} />
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg ml-5"
                                    onClick={() => {
                                        employee.proposalDate = format(
                                            new Date(
                                                employee.proposalDate
                                            ).getTime(),
                                            "yyyy-MM-dd"
                                        );
                                        console.log(employee);
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
                employee={employee}
                handleGetRecomentByEmp={handleGetRecomentByEmp}
            />
        </>
    );
};

export default TabRecommendation;
