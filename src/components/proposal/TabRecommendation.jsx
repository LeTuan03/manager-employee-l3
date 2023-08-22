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
import FormUpdateHappening from "../update-happening/FormUpdateHappening";
import ModalInfo from "../modal-update-happening/ModalInfo";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";
import NumberStatus from "../common/NumberStatus";
import TextToTruncate from "../common/TextToTruncate";
import validateCodeInput from "../common/ValidateCodeInput";
import { setIsLoading } from "../../redux/employee/employeeSlice";
import {
    STATUS_EMPLOYEE_NUMBER,
    TYPE_UPDATEHAPPENING,
} from "../../constants/constants";

const TabRecommendation = ({
    recoments,
    handleGetRecomentByEmp,
    formRecoment,
}) => {
    const {
        NEW_SAVE,
        PENDING,
        BEEN_APPEOVED,
        ADDITIONAL_REQUIREMENTS,
        REJECT,
    } = STATUS_EMPLOYEE_NUMBER;
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(false);
    const { open, employee } = useSelector((state) => state.employee);

    useEffect(() => {
        if (!open.modalUpdateHappening) {
            formRecoment.resetFields();
        }
    }, [open.modalUpdateHappening]);

    const handleDeleteRecoment = async (id) => {
        try {
            dispatch(setIsLoading(true));
            await deleteProposal(id);
            message.success("Xóa thành công!");
            formRecoment.resetFields();
            await handleGetRecomentByEmp();
            dispatch(setIsLoading(false));
        } catch (error) {
            message.error("Xóa thất bại!");
            dispatch(setIsLoading(false));
        }
    };
    const handleSubmit = async (value) => {
        try {
            dispatch(setIsLoading(true));
            if (value.id) {
                const res = await updateProposal(value);
                setData(res?.data?.data);
                message.success("Cập nhật thành công!");
            } else {
                const res = await addProposalByEmp(employee?.id, [value]);
                setData(res?.data?.data[0]);
                message.success("Thêm mới thành công!");
            }
            await handleGetRecomentByEmp();
            setIsModalOpen(true);
            dispatch(setIsLoading(false));
            formRecoment.resetFields();
        } catch (error) {
            message.error("Cập nhật thất bại !");
            dispatch(setIsLoading(false));
        }
    };

    const handleEdit = (employee) => {
        employee.proposalDate = format(
            new Date(employee.proposalDate),
            "yyyy-MM-dd"
        );
        setData(employee);
        formRecoment.setFieldsValue(employee);
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
                    {employee.proposalStatus === NEW_SAVE && (
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
                    {[PENDING, BEEN_APPEOVED].includes(
                        employee.proposalStatus
                    ) && (
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
                    {[ADDITIONAL_REQUIREMENTS, REJECT].includes(
                        employee.proposalStatus
                    ) && (
                        <div>
                            <ModalInfo
                                type={
                                    employee.proposalStatus ===
                                    ADDITIONAL_REQUIREMENTS
                                        ? "req"
                                        : ""
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
            <Form form={formRecoment} onFinish={handleSubmit} layout="vertical">
                <Row gutter={25}>
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
                    <Col span={6} xl={6} lg={6} md={12} sm={12} xs={12}>
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
                    <Col span={6} xl={6} lg={6} md={12} sm={12} xs={12}>
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
                    <Col span={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>

                    <Col xl={8} lg={12} md={12} sm={12} xs={12}>
                        <Form.Item
                            name="content"
                            label="Nội dung"
                            rules={[
                                {
                                    required: true,
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            name="detailedDescription"
                            label="Mô tả chi tiết"
                            rules={[
                                {
                                    required: true,
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col xl={2} lg={3} md={3} sm={4} xs={4}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                className="w-full"
                                htmlType="submit"
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col xl={2} lg={3} md={3} sm={4} xs={4}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                danger
                                className="w-full"
                                onClick={() => formRecoment.resetFields()}
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
            <FormUpdateHappening
                type={TYPE_UPDATEHAPPENING.RECOMMEND}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                handleGetRecomentByEmp={handleGetRecomentByEmp}
            />
            {openDelete && (
                <ModalDelete
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    employeeIdToDelete={employeeIdToDelete}
                    handleDeleteEmployee={handleDeleteRecoment}
                />
            )}
        </>
    );
};

export default TabRecommendation;
