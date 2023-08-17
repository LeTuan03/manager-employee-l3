import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Input,
    Row,
    Select,
    Table,
    message,
} from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    addProposalByEmp,
    deleteProposal,
    updateProposal,
} from "../../services/api";
import ModalUpdateHappening from "./RecomnentModal";
import ModalInfo from "../modal-update-happening/ModalInfo";
import { useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";
import NumberStatus from "../common/NumberStatus";
import TextToTruncate from "../common/TextToTruncate";
import validateCodeInput from "../common/ValidateCodeInput";

const TabRecommendation = ({ recoments, handleGetRecomentByEmp }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(false);
    const { open, employee } = useSelector((state) => state.employee);

    useEffect(() => {
        if (!open.modalUpdateHappening) {
            form.resetFields();
        }
    }, [open.modalUpdateHappening]);

    const handleDeleteRecoment = async (id) => {
        try {
            setLoading(true);
            await deleteProposal(id);
            message.success("Xóa thành công!");
            form.resetFields();
            await handleGetRecomentByEmp();
            setLoading(false);
        } catch (error) {
            message.error("Xóa thất bại!");
            console.log(error);
        }
    };
    const handleSubmit = async (value) => {
        try {
            setLoading(true);
            if (value.id) {
                const res = await updateProposal(value);
                setData(res?.data?.data);
                message.success("Cập nhật thành công!");
                await handleGetRecomentByEmp();
                setIsModalOpen(true);
            } else {
                const res = await addProposalByEmp(employee?.id, [value]);
                setData(res?.data?.data[0]);
                message.success("Thêm mới thành công!");
                await handleGetRecomentByEmp();
                setIsModalOpen(true);
            }
            setLoading(false);
            form.resetFields();
        } catch (error) {
            message.error("Cập nhật thất bại !");
            console.log(error);
            setLoading(false);
        }
    };

    const handleEdit = (employee) => {
        employee.proposalDate = format(
            new Date(employee.proposalDate),
            "yyyy-MM-dd"
        );
        setData(employee);
        form.setFieldsValue(employee);
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
            title: "Ngày diễn biến",
            dataIndex: "proposalDate",
            key: "proposalDate",
            width: 130,
            align: "center",
            render: (proposalDate) =>
                format(new Date(proposalDate), "dd/MM/yyyy"),
        },
        {
            title: "Loại ",
            dataIndex: "type",
            key: "type",
            width: 130,
            align: "center",
            render: (type) => (type === 2 ? "Tham mưu" : "Đề xuất"),
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            align: "center",
            render: (note) => (
                <p className="text-left">{TextToTruncate(note || "", 30)}</p>
            ),
        },

        {
            title: "Mô tả chi tiết",
            dataIndex: "detailedDescription",
            key: "detailedDescription",
            align: "center",
            render: (detailedDescription) => (
                <p className="text-left">
                    {TextToTruncate(detailedDescription || "", 30)}
                </p>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "proposalStatus",
            key: "proposalStatus",
            width: 190,
            align: "center",
            render: (proposalStatus) =>
                TextToTruncate(NumberStatus(proposalStatus) || "", 13),
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            width: 130,
            align: "center",
            render: (_, employee) => (
                <div>
                    {employee.proposalStatus === 1 && (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => handleEdit(employee)}
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
                    {[2, 3].includes(employee.proposalStatus) && (
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
                    {[4, 5].includes(employee.proposalStatus) && (
                        <div>
                            <ModalInfo
                                type={
                                    employee.proposalStatus === 4 ? "req" : ""
                                }
                                message={employee}
                            />
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg"
                                    onClick={() => handleEdit(employee)}
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
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
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
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="detailedDescription"
                            label="Mô tả chi tiết"
                            rules={[
                                {
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                loading={loading}
                                type="primary"
                                className="w-full"
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
                    <div className="main-table">
                        <ConfigProvider renderEmpty={() => <></>}>
                            <Table
                                bordered
                                columns={columns}
                                dataSource={recoments}
                                pagination={false}
                            />
                        </ConfigProvider>
                    </div>
                </Col>
            </Row>
            <ModalUpdateHappening
                type="recoment"
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                handleGetRecomentByEmp={handleGetRecomentByEmp}
            />
            <ModalDelete
                loading={loading}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                employeeIdToDelete={employeeIdToDelete}
                handleDeleteEmployee={handleDeleteRecoment}
            />
        </>
    );
};

export default TabRecommendation;
